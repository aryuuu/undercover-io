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
  id: string;
  username: string;
  score: number;
  avatar: string;
  isHost: Boolean;
  isAlive: Boolean;
}
export interface Room {
  id: string;
  host: string;
  player: number;
  undercover: number;
  mrwhite: number;
}
export interface Request {
  reqId: string;
}
export interface Response {
  resId: string;
  status: string;
  message: string;
}
export interface CreateRoomReq extends Request {
  userId: string;
  username: string;
  player: number;
  undercover: number;
  mrwhite: number;
}
export interface JoinRoomReq extends Request {
  roomId: string;
  userId: string;
  player: Player;
}
export interface VoteReq extends Request {
  voter: string;
  voteTarget: string;
}
export interface CreateRoomRes extends Response {
  roomId: string;
}
export interface JoinRoomRes extends Response {
  roomId: string;
}