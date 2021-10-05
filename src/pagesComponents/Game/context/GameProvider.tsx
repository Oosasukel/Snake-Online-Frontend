import { ArraySchema } from '@colyseus/schema';
import { Client as ColyseusClient, Room, RoomAvailable } from 'colyseus.js';
import { useRouter } from 'next/router';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getCookie, setCookie } from 'utils/cookies';
import { NEVER } from 'utils/cookies/types';
import { LeaveCode } from '../types';
import { GameContext, GAME_ROUTES } from './GameContext';
import { GameState } from './schema';
import { Message, MessageListener, Ranking, User } from './types';

interface GameProviderProps {
  user: User;
  children: ReactNode;
}

export const GameProvider = ({
  children,
  user: userProp,
}: GameProviderProps) => {
  const client = useMemo(() => {
    return new ColyseusClient('ws://localhost:3333');
  }, []);
  const [user, setUser] = useState<User>(userProp);
  const [gameState, setGameState] = useState<GameState>();
  const [rooms, setRooms] = useState<RoomAvailable[]>([]);
  const [playersOnLobby, setPlayersOnLobby] = useState(0);
  const messageListener = useRef<MessageListener>();
  const [ping, setPing] = useState(0);
  const [currentRoute, setCurrentRoute] = useState<GAME_ROUTES>('home');
  const [rankingPosition, setRankingPosition] = useState();
  const router = useRouter();
  const [ranking, setRanking] = useState<Ranking[]>([]);
  const lastPing = useRef<Date>();
  const gameRoom = useRef<Room<GameState>>(null);
  const lobbyRoom = useRef<Room>(null);
  const playersOnline = useMemo(
    () =>
      playersOnLobby +
      rooms.reduce(
        (previousValue, currentValue) => previousValue + currentValue.clients,
        0
      ),
    [playersOnLobby, rooms]
  );

  const leaveLobby = useCallback(() => {
    lobbyRoom.current?.leave();
    lobbyRoom.current = null;
  }, []);

  const signOut = useCallback(() => {
    const currentDate = new Date();
    setCookie('@Snake/access_token', '', { expires: currentDate });
    setCookie('@Snake/refresh_token', '', { expires: currentDate });
    setCookie('@Snake/user', '', { expires: currentDate });
    leaveLobby();
    router.push('/signin');
  }, [leaveLobby, router]);

  const joinLobby = useCallback(() => {
    setCurrentRoute('home');

    const access_token = getCookie('@Snake/access_token');

    client
      .joinOrCreate('lobby', { token: access_token })
      .then((lobby) => {
        lobbyRoom.current = lobby;

        lobby.onMessage('message', (message: Message) => {
          if (messageListener.current) {
            messageListener.current(message);
          }
        });

        lastPing.current = new Date();
        lobby.send('ping');

        lobby.onMessage('pong', () => {
          setPing(new Date().getTime() - lastPing.current.getTime());
          setTimeout(() => {
            lastPing.current = new Date();
            lobby.send('ping');
          }, 1000);
        });

        lobby.onMessage('ranking:top', (topRanking) => setRanking(topRanking));
        lobby.onMessage('ranking:position', (rank) => setRankingPosition(rank));

        lobby.onMessage('users-updated', (playersCount) =>
          setPlayersOnLobby(playersCount)
        );

        lobby.onMessage('rooms', (rooms) => {
          setRooms(rooms);
        });

        lobby.onMessage('+', ([roomId, room]) => {
          setRooms((previousRooms) => {
            const newState = [...previousRooms];

            const roomIndex = newState.findIndex(
              (room) => room.roomId === roomId
            );
            if (roomIndex !== -1) {
              newState[roomIndex] = room;
            } else {
              newState.push(room);
            }

            return newState;
          });
        });

        lobby.onMessage('-', (roomId) => {
          setRooms((previousRooms) => {
            const newState = [...previousRooms];
            return newState.filter((room) => room.roomId !== roomId);
          });
        });
      })
      .catch(() => {
        signOut();
      });
  }, [client, signOut]);

  useEffect(() => {
    joinLobby();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const messageEmit = useCallback((message: string) => {
    lobbyRoom.current?.send('message', message);
    gameRoom.current?.send('message', message);
  }, []);

  const incrementUserPoints = useCallback((points: number) => {
    setUser((previous) => ({ ...previous, points: previous.points + points }));
    const userCookie = JSON.parse(getCookie('@Snake/user'));
    userCookie.points += points;
    setCookie('@Snake/user', JSON.stringify(userCookie), { expires: NEVER });
  }, []);

  const onNewMessage = useCallback((listener: MessageListener) => {
    messageListener.current = listener;
  }, []);

  const leaveRoom = useCallback(() => {
    gameRoom.current?.leave();
  }, []);

  const requestRanking = useCallback(() => {
    lobbyRoom.current?.send('ranking:top');
  }, []);

  const copyGameState = useCallback((state: GameState) => {
    return {
      ...state,
      players: new ArraySchema(
        ...state.players.map((player) => ({
          ...player,
          body: new ArraySchema(...player.body).toArray(),
        }))
      ).toArray(),
      fruits: new ArraySchema(...state.fruits).toArray(),
      slots: new ArraySchema(...state.slots).toArray(),
    } as GameState;
  }, []);

  const setupGameListeners = useCallback(
    (game: Room<GameState>) => {
      gameRoom.current = game;

      setGameState(copyGameState(game.state));
      setCurrentRoute('lobby');

      let lastPlayingStatus = game.state.playing;
      game.onStateChange((newState) => {
        setGameState(copyGameState(newState));

        if (!lastPlayingStatus && newState.playing) setCurrentRoute('game');

        lastPlayingStatus = newState.playing;
      });

      game.onMessage('message', (message: Message) => {
        if (messageListener.current) {
          messageListener.current(message);
        }
      });

      lastPing.current = new Date();
      game.send('ping');

      game.onMessage('pong', () => {
        setPing(new Date().getTime() - lastPing.current.getTime());
        setTimeout(() => {
          lastPing.current = new Date();
          game.send('ping');
        }, 1000);
      });

      game.onLeave((code) => {
        switch (code) {
          case LeaveCode.NORMAL: {
            joinLobby();
            break;
          }
          case LeaveCode.KICKED: {
            joinLobby();
            break;
          }
          default: {
            router.push('/signin');
          }
        }
      });
    },
    [copyGameState, joinLobby, router]
  );

  const joinRoom = useCallback(
    (id: string) => {
      leaveLobby();

      const access_token = getCookie('@Snake/access_token');

      client
        .joinById<GameState>(id, { token: access_token })
        .then(setupGameListeners)
        .catch((error) => {
          if (error.code === 4215) {
            /** @TODO fazer o refresh token e tentar novamente
              refreshToken()
              client.create... 
              .then(setupGameListeners)
              .catch(signOut)
            */
          }

          signOut();
        });
    },
    [client, leaveLobby, setupGameListeners, signOut]
  );

  const createRoom = useCallback(
    async (name: string) => {
      leaveLobby();

      const access_token = getCookie('@Snake/access_token');

      client
        .create<GameState>('game', {
          name,
          token: access_token,
        })
        .then(setupGameListeners)
        .catch((error) => {
          if (error.code === 4215) {
            /** @TODO fazer o refresh token e tentar novamente
              refreshToken()
              client.create... 
              .then(setupGameListeners)
              .catch(signOut)
            */
          }

          signOut();
        });
    },
    [client, leaveLobby, setupGameListeners, signOut]
  );

  const changeDirection = useCallback((direction: number) => {
    gameRoom.current?.send('change-direction', direction);
  }, []);

  const kickPlayer = useCallback((userId: string) => {
    gameRoom.current?.send('kick', userId);
  }, []);

  const openSlot = useCallback((index: number) => {
    gameRoom.current?.send('open-slot', index);
  }, []);

  const closeSlot = useCallback((index: number) => {
    gameRoom.current?.send('close-slot', index);
  }, []);

  const updateReady = useCallback((ready: boolean) => {
    gameRoom.current?.send('update-ready', ready);
  }, []);

  const updateRoomConfig = useCallback((config: { size: number }) => {
    gameRoom.current?.send('update-config', config);
  }, []);

  const returnToLobby = useCallback(() => {
    setCurrentRoute('lobby');
  }, []);

  return (
    <GameContext.Provider
      value={{
        rankingPosition,
        ranking,
        ping,
        incrementUserPoints,
        messageEmit,
        onNewMessage,
        joinRoom,
        createRoom,
        leaveRoom,
        requestRanking,
        signOut,
        returnToLobby,
        currentRoute,
        gameState,
        rooms,
        playersOnline,
        user,
        closeSlot,
        updateReady,
        updateRoomConfig,
        kickPlayer,
        openSlot,
        changeDirection,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
