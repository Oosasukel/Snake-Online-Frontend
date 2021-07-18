import { createContext } from 'react';
import { MessageListener } from './types';

interface GameContextProps {
  messageEmit: (message: string) => void;
  onNewMessage: (listener: MessageListener) => void;
}

export const GameContext = createContext({} as GameContextProps);
