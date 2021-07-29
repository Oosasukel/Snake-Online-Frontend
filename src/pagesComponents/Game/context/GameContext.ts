import { createContext } from 'react';
import { MessageListener, Room, User } from './types';

export type GAME_ROUTES = 'lobby' | 'home' | 'game';

interface GameContextProps {
  user: User;
  currentRoom?: Room;
  rooms: Room[];
  playersOnline: number;
  currentRoute: GAME_ROUTES;
  messageEmit: (message: string) => void;
  signOut: () => void;
  onNewMessage: (listener: MessageListener) => void;
  joinRoom: (id: string) => void;
  leaveRoom: () => void;
  createRoom: (name: string) => void;
}

export const GameContext = createContext({} as GameContextProps);
