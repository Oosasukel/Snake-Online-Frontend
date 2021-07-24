import { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { getStorage } from 'utils/storage';
import { GameContext } from './GameContext';
import { Message, MessageListener } from './types';

export const GameProvider = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [connected, setConnected] = useState(false);
  const messageListener = useRef<MessageListener>();

  useEffect(() => {
    const access_token = getStorage('access_token');

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
      value={{ messageEmit, onNewMessage, joinRoom, connected }}
    >
      {children}
    </GameContext.Provider>
  );
};
