import { useRouter } from 'next/router';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { getCookie, setCookie } from 'utils/cookies';
import { NEVER } from 'utils/cookies/types';
import { GameContext, GAME_ROUTES } from './GameContext';
import {
  Game,
  HomeRoom,
  LobbyRoom,
  Message,
  MessageListener,
  Ranking,
  User,
} from './types';

interface GameProviderProps {
  user: User;
  children: ReactNode;
}

export const GameProvider = ({
  children,
  user: userProp,
}: GameProviderProps) => {
  const [socket, setSocket] = useState<Socket>();
  const [user, setUser] = useState<User>(userProp);
  const [currentRoom, setCurrentRoom] = useState<LobbyRoom>();
  const [currentGame, setCurrentGame] = useState<Game>();
  const [rooms, setRooms] = useState<HomeRoom[]>([]);
  const [playersOnline, setPlayersOnline] = useState(0);
  const messageListener = useRef<MessageListener>();
  const [ping, setPing] = useState(0);
  const [currentRoute, setCurrentRoute] = useState<GAME_ROUTES>('home');
  const [rankingPosition, setRankingPosition] = useState();
  const router = useRouter();
  const [ranking, setRanking] = useState<Ranking[]>([]);
  const lastPing = useRef<Date>();

  useEffect(() => {
    const access_token = getCookie('@Snake/access_token');

    const socketConnected = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      query: { token: access_token },
    });

    setSocket(socketConnected);

    socketConnected.on('connect_error', (reason) => {
      console.log('connect_error', reason);
      socketConnected.disconnect();
      signOut();
    });
    socketConnected.on('error', (error: string) => {
      /*
        Errors:
          Room already exists.
          All players need accept.
      */
      console.error('error', error);
    });
    socketConnected.on('connect', () => {
      setTimeout(() => {
        lastPing.current = new Date();
        socketConnected.emit('ping');
      }, 100);
      socketConnected.on('pong', () => {
        setPing(new Date().getTime() - lastPing.current.getTime());
        setTimeout(() => {
          lastPing.current = new Date();
          socketConnected.emit('ping');
        }, 1000);
      });

      socketConnected.on('disconnect', (reason) => {
        console.log('disconnect', reason);
        socketConnected.disconnect();
        signOut();
      });

      socketConnected.on('message', (message: Message) => {
        if (messageListener.current) {
          messageListener.current(message);
        }
      });
      socketConnected.on('ranking:top', (topRanking) => setRanking(topRanking));
      socketConnected.on('ranking:position', (rank) =>
        setRankingPosition(rank)
      );
      socketConnected.on('rooms-updated', (rooms: HomeRoom[]) =>
        setRooms(rooms)
      );
      socketConnected.on('users-updated', (playersCount) =>
        setPlayersOnline(playersCount)
      );
      socketConnected.on('room-successfuly-created', (room: LobbyRoom) => {
        setCurrentRoom(room);
        setCurrentRoute('lobby');
      });
      socketConnected.on('joined-room', (room: LobbyRoom) => {
        setCurrentRoom(room);
        setCurrentRoute('lobby');
      });
      socketConnected.on('user-left-room', (room: LobbyRoom) =>
        setCurrentRoom(room)
      );
      socketConnected.on('new-user-joined-room', (room: LobbyRoom) =>
        setCurrentRoom(room)
      );
      socketConnected.on('room:config-updated', (room: LobbyRoom) =>
        setCurrentRoom(room)
      );
      socketConnected.on('left-room', () => setCurrentRoute('home'));
      socketConnected.on(
        'slot-updated',
        (index: number, newState: 'closed' | 'open') =>
          setCurrentRoom((previous) => {
            const roomUpdated = { ...previous };
            roomUpdated.slots[index] = newState;
            return roomUpdated;
          })
      );
      socketConnected.on('game-started', (game: Game) => {
        setCurrentGame(game);
        setCurrentRoute('game');
      });
      socketConnected.on('game-update', (game: Game) => setCurrentGame(game));
      socketConnected.on('room-user-changed', (room: LobbyRoom) =>
        setCurrentRoom(room)
      );
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = useCallback(() => {
    const currentDate = new Date();
    setCookie('@Snake/access_token', '', { expires: currentDate });
    setCookie('@Snake/refresh_token', '', { expires: currentDate });
    setCookie('@Snake/user', '', { expires: currentDate });
    if (socket) {
      socket.disconnect();
    }
    router.push('/signin');
  }, [router, socket]);

  const messageEmit = useCallback(
    (message: string) => {
      if (socket) {
        socket.emit('message', message);
      }
    },
    [socket]
  );

  const incrementUserPoints = useCallback((points: number) => {
    setUser((previous) => ({ ...previous, points: previous.points + points }));
    const userCookie = JSON.parse(getCookie('@Snake/user'));
    userCookie.points += points;
    setCookie('@Snake/user', JSON.stringify(userCookie), { expires: NEVER });
  }, []);

  const onNewMessage = useCallback((listener: MessageListener) => {
    messageListener.current = listener;
  }, []);

  const joinRoom = useCallback(
    (id: string) => {
      if (socket) {
        socket.emit('join-room', id);
      }
    },
    [socket]
  );

  const leaveRoom = useCallback(() => {
    if (socket) {
      socket.emit('leave-room');
    }
  }, [socket]);

  const requestRanking = useCallback(() => {
    if (socket) {
      socket.emit('ranking:top');
    }
  }, [socket]);

  const createRoom = useCallback(
    (name: string) => {
      if (socket) {
        socket.emit('create-room', name);
      }
    },
    [socket]
  );

  const changeDirection = useCallback(
    (direction: number) => {
      if (socket && currentGame) {
        socket.emit('game:change-direction', direction, currentGame.id);
      }
    },
    [currentGame, socket]
  );

  const kickPlayer = useCallback(
    (userId: string) => {
      if (socket) {
        socket.emit('room:kick', userId);
      }
    },
    [socket]
  );

  const openSlot = useCallback(
    (index: number) => {
      if (socket) {
        socket.emit('room:open-slot', index);
      }
    },
    [socket]
  );

  const closeSlot = useCallback(
    (index: number) => {
      if (socket) {
        socket.emit('room:close-slot', index);
      }
    },
    [socket]
  );

  const updateReady = useCallback(
    (ready: boolean) => {
      if (socket) {
        socket.emit('room:update-ready', ready);
      }
    },
    [socket]
  );

  const updateRoomConfig = useCallback(
    (config: { size: number }) => {
      if (socket) {
        socket.emit('room:update-config', config);
      }
    },
    [socket]
  );

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
        currentRoom,
        currentGame,
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
