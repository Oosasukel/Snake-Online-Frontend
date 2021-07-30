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
}

export interface LobbyRoom {
  id: string;
  name: string;
  owner: string;
  users: RoomUser[];
  slots: string[] /* 'closed' | 'open' | userId */;
  mapSize: number;
  game: string | null;
}

export interface RoomUser {
  id: string;
  nickname: string;
  email: string;
  points: number;
  ready: boolean;
}

export interface Game {
  roomId: string;
  id: string;
  users: Array<{
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
    direction: up | down | left | right;
  }>;
  fruits: Array<{
    x: number;
    y: number;
  }>;
}

type up = { x: 0; y: -1 };
type down = { x: 0; y: 1 };
type left = { x: -1; y: 0 };
type right = { x: 1; y: 0 };

export type MessageListener = (message: Message) => void;
