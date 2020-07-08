import express from 'express';
import socketio from 'socket.io';
import cors from 'cors';

import socket from './socket';
import { GameRoom, RoomClient } from './types';

const PORT = process.env.PORT || 3003;
// with express
const app = express();
const socketServer = socketio();
const rooms: GameRoom[] = [];
const roomClients: RoomClient[] = [];

app.use(cors({
  credentials: true,
  origin: '*'
}));

app.get('/', (req, res) => {
  res.send("Welcome to socket.io app");
})
const expressServer = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
const ioServer = socketServer.listen(expressServer);
socket(ioServer, rooms, roomClients);
