import { createContext } from 'react';
import { MessageListener, Room, UpdateRoomsListener, User } from './types';

export type GAME_ROUTES = 'lobby' | 'home' | 'game';

interface GameContextProps {
  user: User;
  connected: boolean;
  currentRoom?: Room;
  currentRoute: GAME_ROUTES;
  messageEmit: (message: string) => void;
  onNewMessage: (listener: MessageListener) => void;
  subscribeUpdateRooms: (listener: UpdateRoomsListener) => void;
  joinRoom: (id: string) => void;
  createRoom: (name: string) => void;
}

export const GameContext = createContext({} as GameContextProps);
