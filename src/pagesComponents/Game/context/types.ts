export interface User {
  id: string;
  email: string;
  nickname: string;
  points: number;
}

export interface Message {
  sender: string;
  text: string;
}

export interface RoomUser {
  id: string;
  nickname: string;
  email: string;
  points: number;
  ready: boolean;
}

export interface HomeRoom {
  id: string;
  name: string;
  maxUsers: number;
  currentUsers: number;
  playing: boolean;
  mapSize: number;
}

export interface LobbyRoom {
  id: string;
  name: string;
  owner: string;
  users: RoomUser[];
  slots: string[] /* 'closed' | 'open' | userId */;
  mapSize: number;
  playing: boolean;
}

export interface RoomUser {
  id: string;
  nickname: string;
  email: string;
  points: number;
  ready: boolean;
}

export interface Game {
  id: string;
  mapSize: number;
  users: GameUser[];
  fruits: Array<{
    x: number;
    y: number;
  }>;
}

export interface GameUser {
  id: string;
  gamePoints: number;
  body: Array<{
    x: number;
    y: number;
  }>;
  head: {
    x: number;
    y: number;
  };
}

export const directions = {
  up: 1,
  right: 2,
  down: 3,
  left: 4,
};

export type MessageListener = (message: Message) => void;
