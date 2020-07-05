import express from 'express';
import socketio from 'socket.io';
import cors from 'cors';

import socket from './socket';

const PORT = process.env.PORT || 3003;
// with express
const app = express();
const socketServer = socketio();

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
socket(ioServer);
