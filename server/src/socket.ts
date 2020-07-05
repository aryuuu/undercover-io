import socketio from 'socket.io';
import { v4 as uuid } from 'uuid';

import { 
  Room, 
  Chat,
  CreateRoomReq,
  JoinRoomReq
} from './types';

const socket = (io: socketio.Server) => {
  io.on('connection', (conn: socketio.Socket) => {
    console.log('new connection');
    conn.emit('new-connection-notif', 'Hello there');

    conn.on('create-room', (req: CreateRoomReq) => {
      console.log(`user ${req.userId} wants to create a room`);
      // console.log(`room spec: ${JSON.stringify(req)}`);
      conn.emit('create-reply', { 
        resId: req.reqId,
        roomId: uuid(),
        room: {},
        status: 'success',
        message: `ok ${req.username}, please wait a second`,

      })
    });
    conn.on('join-room', (req: JoinRoomReq) => {
      console.log(`user ${req.player.id} wants to join room ${req.roomId}`);
      conn.emit('join-reply', {
        resId: req.reqId,
        roomId: req.roomId,
        room: {},
        status: 'success',
        message: `Redirecting you to room ${req.roomId}`
      });
    })
    conn.on('chat', (data: Chat) => {
      console.log(`${data.sender} says: "${data.content}"`);
      // broadcast the message
    })
  });
};

export default socket;