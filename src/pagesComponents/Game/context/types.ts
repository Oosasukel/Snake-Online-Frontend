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

export type MessageListener = (message: Message) => void;
