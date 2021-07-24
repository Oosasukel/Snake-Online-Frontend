import { createContext } from 'react';
import { MessageListener } from './types';

interface GameContextProps {
  connected: boolean;
  messageEmit: (message: string) => void;
  onNewMessage: (listener: MessageListener) => void;
  joinRoom: (id: string) => void;
}

export const GameContext = createContext({} as GameContextProps);
