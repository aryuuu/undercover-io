export interface Chat {
  sender: string,
  content: string,
  timestamp: number
}

export interface Log {
  type: string;
  content: string;
  timestamp: number;
}

export interface Player {
  username: string;
  score: number;
  avatar: string;
  isHost: Boolean;
  isAlive: Boolean;
}