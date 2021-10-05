import { Schema } from '@colyseus/schema';

export class Position extends Schema {
  x: number;
  y: number;
}

export class Player extends Schema {
  id: string;
  name: string;

  head = new Position();
  body: Position[] = [];

  owner: boolean;

  gamePoints: number;

  ready: boolean;
}

export class Slot extends Schema {
  open: boolean;
  player?: Player;
}

export class GameState extends Schema {
  players: Player[] = [];
  fruits: Position[] = [];

  mapSize: number;

  slots: Slot[] = [];
  playing: boolean;

  roomName: string;
}
