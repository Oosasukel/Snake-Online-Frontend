import { useRouter } from 'next/router';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { getCookie } from 'utils/cookies';
import { signOut } from 'utils/signOut';
import { GameContext, GAME_ROUTES } from './GameContext';
import {
  Message,
  MessageListener,
  Room,
  UpdateRoomsListener,
  User,
} from './types';

interface GameProviderProps {
  user: User;
  children: ReactNode;
}

export const GameProvider = ({ children, user }: GameProviderProps) => {
  const [socket, setSocket] = useState<Socket>();
  const [currentRoom, setCurrentRoom] = useState<Room>();
  const [connected, setConnected] = useState(false);
  const messageListener = useRef<MessageListener>();
  const updateRoomsListener = useRef<UpdateRoomsListener>();
  const [currentRoute, setCurrentRoute] = useState<GAME_ROUTES>('home');
  const router = useRouter();

  useEffect(() => {
    const access_token = getCookie('@Snake/access_token');

    const socketConnected = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      query: { token: access_token },
    });

    setSocket(socketConnected);
    setConnected(true);

    socketConnected.on('connect_error', () => {
      signOut(router);
    });
    socketConnected.on('disconnect', () => {
      signOut(router);
    });
    socketConnected.on('message', (message: Message) => {
      if (messageListener.current) {
        messageListener.current(message);
      }
    });
    socketConnected.on('rooms-updated', (rooms: Room[]) => {
      if (updateRoomsListener.current) {
        updateRoomsListener.current(rooms);
      }
    });
    socketConnected.on('room-successfuly-created', (room: Room) => {
      setCurrentRoom(room);
      setCurrentRoute('lobby');
    });
    socketConnected.on('joined-room', (room: Room) => {
      setCurrentRoom(room);
      setCurrentRoute('lobby');
    });
  }, []);

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

  const subscribeUpdateRooms = useCallback((listener: UpdateRoomsListener) => {
    updateRoomsListener.current = listener;
  }, []);

  const joinRoom = useCallback(
    (id: string) => {
      if (socket) {
        socket.emit('join-room', id);
      }
    },
    [socket]
  );

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
        subscribeUpdateRooms,
        joinRoom,
        createRoom,
        currentRoute,
        currentRoom,
        connected,
        user,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
