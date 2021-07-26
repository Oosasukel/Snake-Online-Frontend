import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { getCookie } from 'utils/cookies';
import { GameContext } from './GameContext';
import { Message, MessageListener, User } from './types';

interface GameProviderProps {
  user: User;
  children: ReactNode;
}

export const GameProvider = ({ children, user }: GameProviderProps) => {
  const [socket, setSocket] = useState<Socket>();
  const [connected, setConnected] = useState(false);
  const messageListener = useRef<MessageListener>();

  useEffect(() => {
    const access_token = getCookie('@Snake/access_token');

    const socketConnected = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      query: { token: access_token },
    });
    setSocket(socketConnected);
    setConnected(true);

    socketConnected.on('message', (message: Message) => {
      if (messageListener.current) {
        messageListener.current(message);
      }
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

  const joinRoom = useCallback(
    (id: string) => {
      if (socket) {
        socket.emit('join-room', id);
      }
    },
    [socket]
  );

  return (
    <GameContext.Provider
      value={{ messageEmit, onNewMessage, joinRoom, connected, user }}
    >
      {children}
    </GameContext.Provider>
  );
};
