import axios from 'axios';

import { dummyApiUrl } from '../config';
import { 
  Chat,
  Room, 
  Player,
  VoteReq,
  JoinRoomReq,
  StartGameReq,
  CreateRoomReq,
} from '../types';

/** requests */

/**
 * Request a room to server
 * @param socket socketioclient socket 
 * @param req room specification to be created at server
 */
export const reqCreateRoom = (socket: SocketIOClient.Socket, req: CreateRoomReq) => {
  if (req.host.username === '') {
    return 'Please specify your username';
  } else if (req.undercover + req.mrwhite >= req.player) {
    return `Welp, that's kinda impossible man`;
  } else if (req.undercover > (Math.ceil(req.player/2) -1) || 
              req.mrwhite > (Math.ceil(req.player/2) -1)) {
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
export const reqJoinRoom = (socket: SocketIOClient.Socket , req: JoinRoomReq) => {
  if (!req.player.id || !req.player.username ) {
    console.log('Please specify username');
    return 'Please specify username';
  } else if (!req.roomId) {
    console.log('Please specify room id');
    return 'Please specify room id';
  } else {
    socket.emit('join-room', req)
    return 'success';
  }
}

/**
 * send request to start the game
 * @param socket socketio socket
 * @param req startgamereq object
 */
export const startGameReq = (socket: SocketIOClient.Socket, req: StartGameReq) => {
  if (!req.sender.isHost) {
    return 'Only host can start a game';
  } else {
    socket.emit('start-game', req);
    return 'success';
  }
}

/**
 * 
 * @param socket socketio client socket
 * @param chat chat object
 */
export const sendChat = (socket: SocketIOClient.Socket, chat: Chat) => {
  socket.emit('chat', chat);
}

/**
 * Send vote to server
 * @param socket socketio client socket
 * @param req vote req
 */
export const sendVote = (socket: SocketIOClient.Socket, req: VoteReq) => {
  console.log(`voter ${JSON.stringify(req.voter)}`)
  console.log(`is voter alive? ${req.voter.isAlive}`)
  if (!req.voter.isAlive) {
    return 'You are already dead, deal with it';
  } else if (!req.voteTarget.isAlive) {
    return 'Take it easy on him dude';
  } else {
    socket.emit('vote', req);
    return 'success';
  }
}

/** responses */

export const apiTest = async (): Promise<string> => {
  const { data: res } = await axios.get(`${dummyApiUrl}/`);
  return res;
}