import { RoomAvailable } from 'colyseus.js';
import { createContext } from 'react';
import { GameState } from './schema';
import { MessageListener, Ranking, User } from './types';

export type GAME_ROUTES = 'lobby' | 'home' | 'game';

interface GameContextProps {
  user: User;
  ping: number;
  ranking: Ranking[];
  gameState?: GameState;
  rooms: RoomAvailable[];
  playersOnline: number;
  currentRoute: GAME_ROUTES;
  rankingPosition?: number;
  requestRanking: () => void;
  incrementUserPoints: (points: number) => void;
  returnToLobby: () => void;
  messageEmit: (message: string) => void;
  signOut: () => void;
  onNewMessage: (listener: MessageListener) => void;
  joinRoom: (id: string) => void;
  leaveRoom: () => void;
  createRoom: (name: string) => void;
  kickPlayer: (userId: string) => void;
  updateRoomConfig: (config: { size: number }) => void;
  openSlot: (index: number) => void;
  closeSlot: (index: number) => void;
  updateReady: (ready: boolean) => void;
  changeDirection: (direction: number) => void;
}

export const GameContext = createContext({} as GameContextProps);
