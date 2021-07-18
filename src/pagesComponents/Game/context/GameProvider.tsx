import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { getStorage } from 'utils/storage';
import { GameContext } from './GameContext';
import { Message, MessageListener } from './types';

export const GameProvider = ({ children }) => {
  const [socket, setSocket] = useState<Socket | undefined>();
  const messageListener = useRef<MessageListener>();

  useEffect(() => {
    const access_token = getStorage('access_token');

    const socketConnected = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      query: { token: access_token },
    });
    setSocket(socketConnected);

    socketConnected.on('message', (message: Message) => {
      if (messageListener.current) {
        messageListener.current(message);
      }
    });
  }, []);

  const messageEmit = (message: string) => {
    socket.emit('message', message);
  };

  const onNewMessage = (listener: MessageListener) => {
    messageListener.current = listener;
  };

  return (
    <GameContext.Provider value={{ messageEmit, onNewMessage }}>
      {children}
    </GameContext.Provider>
  );
};
