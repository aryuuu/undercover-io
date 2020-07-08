// import socketio from 'socket.io';

export interface Chat {
  senderId: string;
  sender: string,
  content: string,
  roomId: string;
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
  isHost: boolean;
  isAlive: boolean;
}
export interface Room {
  id: string;
  host: string;
  players: Player[];
  playerSlot: number;
  undercoverSlot: number;
  mrwhiteSlot: number;
  isPlaying: boolean;
}
/** server storage interfaces */
// export interface GameClient extends Player {
//   socket: SocketIO.Socket;
// }
export interface RoomClient {
  roomId: string;
  clients: SocketIO.Socket[];
}
export interface GameRoom extends Room {
  clients: SocketIO.Socket[];
}
/** websocket interfaces */
export interface Message {
  content?: string;
}
export interface Request extends Message {
  reqId: string;
}
export interface Response extends Message {
  resId: string;
  status: string;
  message: string;
}
export interface CreateRoomReq extends Request {
  host: Player;
  player: number;
  undercover: number;
  mrwhite: number;
}
export interface JoinRoomReq extends Request {
  roomId: string;
  player: Player;
}
export interface StartGameReq extends Request {
  roomId: string;
  sender: Player;
}
export interface VoteReq extends Request {
  voter: Player;
  voteTarget: Player;
}
export interface CreateRoomRes extends Response {
  room: Room;
}
export interface JoinRoomRes extends Response {
  room: Room;
}
export interface StartGameRes extends Response {
  
}