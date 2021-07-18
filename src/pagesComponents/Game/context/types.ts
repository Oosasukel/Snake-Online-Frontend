export interface Message {
  sender: string;
  text: string;
}

export type MessageListener = (message: Message) => void;
