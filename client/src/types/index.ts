export interface Chat {
  sender: string,
  content: string,
  timestamp: Date
}

export interface Log {
  status: string;
  content: string;
  timestamp: Date;
}

export interface Player {
  username: string;
  score: number;
  avatar: string;
  isHost: Boolean;
  isAlive: Boolean;
}