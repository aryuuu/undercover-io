import axios from 'axios';

import { dummyApiUrl } from '../config';
import { 
  Room, 
  Player,
  CreateRoomReq,
  JoinRoomReq,
  Chat,
  VoteReq
} from '../types';


/**
 * Request a room to server
 * @param socket socketioclient socket 
 * @param req room specification to be created at server
 */
export const reqCreateRoom = async (socket: SocketIOClient.Socket, req: CreateRoomReq) => {
  if (req.username === '') {
    console.log('Please specify your username')
    return 'Please specify your username';
  } else if (req.undercover + req.mrwhite >= req.player) {
    console.log(`welp, that's kinda impossible man`);
    return `Welp, that's kinda impossible man`;
  } else if (req.undercover > (Math.ceil(req.player/2) -1) || 
              req.mrwhite > (Math.ceil(req.player/2) -1)) {
      console.log(`try less undercover or less mr white, or more player`);
      return 'Try less undercover or less mr white, or more player';
  } else {
    socket.emit('create-room', req);
    return 'success';
  }
}

/**
 * request to join a room
 * @param socket socketio socket
 * @param id room id 
 * @param player player object
 */
export const reqJoinRoom = async (socket: SocketIOClient.Socket , id: string, player: Player) => {
  if (!player.id || !player.username ) {
    console.log('Please specify username');
    return 'Please specify username';
  } else if (!id) {
    console.log('Please specify room id');
    return 'Please specify room id';
  } else {
    socket.emit('join-room', { roomId: id, player: player})
    return 'success';
  }
}

/**
 * 
 * @param socket socketio client socket
 * @param chat chat object
 */
export const sendChat = async (socket: SocketIOClient.Socket, chat: Chat) => {

}

/**
 * 
 * @param socket socketio client socket
 * @param req vote req
 */
export const sendVote = async (socket: SocketIOClient.Socket, req: VoteReq) => {

}

export const apiTest = async (): Promise<string> => {
  const { data: res } = await axios.get(`${dummyApiUrl}/`);
  return res;
}