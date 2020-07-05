import socketio from 'socket.io';
import { v4 as uuid } from 'uuid';

import { 
  Room, 
  Chat,
  CreateRoomReq,
  JoinRoomReq,
  VoteReq
} from './types';

const socket = (io: socketio.Server) => {
  io.on('connection', (conn: socketio.Socket) => {
    console.log('new connection');
    conn.emit('new-connection-notif', 'Hello there');

    conn.on('create-room', (req: CreateRoomReq) => {
      // validate request
      console.log(`user ${req.userId} wants to create a room`);
      const roomId = uuid();
      // send response
      conn.emit('create-reply', { 
        resId: req.reqId,
        roomId: roomId,
        room: {},
        status: 'success',
        message: `ok ${req.username}, please wait a second`,
      });
      // put connection into a room
      conn.join(roomId);
    });
    conn.on('join-room', (req: JoinRoomReq) => {
      // validate request
      console.log(`user ${req.player.id} wants to join room ${req.roomId}`);
      // send reesponse
      conn.emit('join-reply', {
        resId: req.reqId,
        roomId: req.roomId,
        room: {},
        status: 'success',
        message: `Redirecting you to room ${req.roomId}`
      });
      // put connection into a room
      conn.join(req.roomId);
    });
    conn.on('chat', (data: Chat) => {
      console.log(`${data.sender} says: "${data.content}"`);
      // broadcast the message
    });
    conn.on('vote', (data: VoteReq) => {

    })
  });
};

export default socket;