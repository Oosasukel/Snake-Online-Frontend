import { createContext } from 'react';
import { MessageListener, User } from './types';

interface GameContextProps {
  user: User;
  connected: boolean;
  messageEmit: (message: string) => void;
  onNewMessage: (listener: MessageListener) => void;
  joinRoom: (id: string) => void;
}

export const GameContext = createContext({} as GameContextProps);
