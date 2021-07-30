import { createContext } from 'react';
import { HomeRoom, LobbyRoom, MessageListener, User } from './types';

export type GAME_ROUTES = 'lobby' | 'home' | 'game';

interface GameContextProps {
  user: User;
  currentRoom?: LobbyRoom;
  rooms: HomeRoom[];
  playersOnline: number;
  currentRoute: GAME_ROUTES;
  messageEmit: (message: string) => void;
  signOut: () => void;
  onNewMessage: (listener: MessageListener) => void;
  joinRoom: (id: string) => void;
  leaveRoom: () => void;
  createRoom: (name: string) => void;
  kickPlayer: (userId: string) => void;
  openSlot: (index: number) => void;
  closeSlot: (index: number) => void;
  updateReady: (ready: boolean) => void;
}

export const GameContext = createContext({} as GameContextProps);
