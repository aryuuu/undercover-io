import axios from 'axios';

import { dummyApiUrl } from '../config';
import { 
  Room, 
  Player,
  CreateRoomReq,
  JoinRoomReq
} from '../types';


/**
 * Request a room to server
 * @param io socketioclient socket 
 * @param req room specification to be created at server
 */
export const reqCreateRoom = async (io: SocketIOClient.Socket, req: CreateRoomReq) => {
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
    io.emit('create-room', req);
    return 'success';
  }
}

export const reqJoinRoom = async (io: SocketIOClient.Socket , id: string, player: Player) => {
  if (!player.id || !player.username ) {
    console.log('Please specify username');
    return 'Please specify username';
  } else if (!id) {
    console.log('Please specify room id');
    return 'Please specify room id';
  } else {
    io.emit('join-room', { roomId: id, ...player})
    return 'success';
  }
}

export const apiTest = async (): Promise<string> => {
  const { data: res } = await axios.get(`${dummyApiUrl}/`);
  return res;
}