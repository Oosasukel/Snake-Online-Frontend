import { useRouter } from 'next/router';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { getCookie, setCookie } from 'utils/cookies';
import { GameContext, GAME_ROUTES } from './GameContext';
import { Message, MessageListener, Room, User } from './types';

interface GameProviderProps {
  user: User;
  children: ReactNode;
}

export const GameProvider = ({ children, user }: GameProviderProps) => {
  const [socket, setSocket] = useState<Socket>();
  const [currentRoom, setCurrentRoom] = useState<Room>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [playersOnline, setPlayersOnline] = useState(0);
  const messageListener = useRef<MessageListener>();
  const [currentRoute, setCurrentRoute] = useState<GAME_ROUTES>('home');
  const router = useRouter();

  useEffect(() => {
    const access_token = getCookie('@Snake/access_token');
    console.log('access_token', access_token);

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
      */
      console.log('error', error);
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
    socketConnected.on('rooms-updated', (rooms: Room[]) => setRooms(rooms));
    socketConnected.on('users-updated', (playersCount) =>
      setPlayersOnline(playersCount)
    );
    socketConnected.on('room-successfuly-created', (room: Room) => {
      setCurrentRoom(room);
      setCurrentRoute('lobby');
    });
    socketConnected.on('joined-room', (room: Room) => {
      setCurrentRoom(room);
      setCurrentRoute('lobby');
    });
    socketConnected.on('user-left-room', (room: Room) => setCurrentRoom(room));
    socketConnected.on('new-user-joined-room', (room: Room) =>
      setCurrentRoom(room)
    );
    socketConnected.on('left-room', () => setCurrentRoute('home'));

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

  const createRoom = useCallback(
    (name: string) => {
      if (socket) {
        socket.emit('create-room', name);
      }
    },
    [socket]
  );

  return (
    <GameContext.Provider
      value={{
        messageEmit,
        onNewMessage,
        joinRoom,
        createRoom,
        leaveRoom,
        signOut,
        currentRoute,
        currentRoom,
        rooms,
        playersOnline,
        user,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
