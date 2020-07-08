import socketio from 'socket.io';
import { v4 as uuid } from 'uuid';

import {
  Log, 
  Room, 
  Chat,
  VoteReq,
  Response,
  GameRoom,
  RoomClient,
  JoinRoomReq,
  JoinRoomRes,
  StartGameReq,
  CreateRoomReq,
  CreateRoomRes,
} from './types';
import { randInt, generateWord } from './helpers';

const socket = (io: socketio.Server, rooms: Room[], roomClients: RoomClient[]) => {
  io.on('connection', (socket: socketio.Socket) => {
    console.log('new connection');
    socket.emit('new-connection-notif', 'Hello there');

    socket.on('create-room', (req: CreateRoomReq) => {
      try {
        // validate request
        console.log(`user ${req.host.id} wants to create a room`);
        const roomId = uuid();
        // create and push the new room
        const newRoom: Room = {
          id: roomId,
          host: req.host.id,
          players: [req.host],
          playerSlot: req.player,
          undercoverSlot: req.undercover,
          mrwhiteSlot: req.mrwhite,
          isPlaying: false
        }
        rooms.push(newRoom);
        roomClients.push({roomId: roomId, clients: [socket]});
        console.log('push new room');
        // put connection into a room
        socket.join(roomId, () => {
        });
        // send response
        io.to(roomId).emit('create-reply', {
          resId: req.reqId,
          room: newRoom,
          status: 'success',
          message: `ok ${req.host.username}, please wait a second`,
        });
        io.to(roomId).emit('log-broadcast', {
          type: 'info',
          content: `${req.host.username} joined the room`,
          timestamp: Date.now()
        });

      } catch (error) {
        console.log(error);
        socket.emit('create-reply', {
          resId: req.reqId,
          status: 'error',
          message: 'failed creating room'
        } as Response);
      }

      
    });
    socket.on('join-room', (req: JoinRoomReq) => {
      try {
        // validate request
        console.log(`user ${req.player.id} wants to join room ${req.roomId}`);
        const targetRoom = rooms.find(room => room.id === req.roomId);
        if (targetRoom) {
          console.log(`room ${req.roomId} exists`);
          if (targetRoom.players.length < targetRoom.playerSlot) {
            // put player and connection into a room
            // push new client
            targetRoom.players.push(req.player);
            const targetRoomClient = roomClients.find(roomClient => roomClient.roomId === targetRoom.id);
            targetRoomClient.clients.push(socket);

            socket.join(req.roomId);
            // send response
            socket.emit('join-reply', {
              resId: req.reqId,
              room: targetRoom as Room,
              status: 'success',
              message: `Redirecting you to room ${req.roomId}`
            } as JoinRoomRes);
            // broadcast this arrival of new player
            io.to(req.roomId).emit('log-broadcast', {
              type: 'info',
              content: `${req.player.username} joined the room`,
              timestamp: Date.now()
            } as Log);
            io.to(req.roomId).emit('new-player', req.player);
          } else {
            console.log(`room ${req.roomId} full`);
            socket.emit('join-reply', {
              resId: req.reqId,
              status: 'error',
              message: `Room is full`
            } as Response);
          }
        } else {
          console.log(`room doesnt ${req.roomId} exist`);
          socket.emit('join-reply', {
            resId: req.reqId,
            status: 'error',
            message: `Room doesn't exist`
          } as Response);
        }
      } catch (error) {
        socket.emit('join-reply', {
          resId: req.reqId,
          status: 'error',
          message: 'Failed joining room'
        } as Response);
      }
    });
    socket.on('start-game', (req: StartGameReq) => {
      try {
        // validate request
        const targetRoom = rooms.find(room => room.id === req.roomId)
        if (targetRoom) {
          if (targetRoom.host === req.sender.id) {
            if (targetRoom.players.length >= 4) {
              const targetRoomClient = roomClients.find(roomClient => roomClient.roomId === targetRoom.id);
              // generate wordlist
              const { players, playerSlot, undercoverSlot, mrwhiteSlot } = targetRoom;
              const { clients } = targetRoomClient;
              const { words, undercover, mrwhite } = generateWord(playerSlot, undercoverSlot, mrwhiteSlot, players.length, ['pisang', 'pisang raja']);
              
              // send words to each players
              clients.forEach((client, index) => {client.emit('new-word', words[index])});
              // notify players
              io.to(req.roomId).emit('log-broadcast', {
                type: 'warning',
                content: `game started whit ${clients.length} player, ${undercover} undercover, and ${mrwhite} mr. white`,
                timestamp: Date.now()
              } as Log);

            } else {
              // send not enough player error
              socket.emit('start-game-reply', {
                resId: req.reqId,
                status: 'error',
                message: 'not enough player',
              })
            }

          } else {
            // send only host can start a game error
            socket.emit('start-game-reply', {
              resId: req.reqId,
              status: 'error',
              message: 'Only host can start a game',
            })
          }
        } else {
          // send room doesnt exist error
          socket.emit('start-game-reply', {
            resId: req.reqId,
            status: 'error',
            message: `Room doesn't exist`,
          })

        }
      } catch (error) {
        socket.emit('start-game-reply', {
          resId: req.reqId,
          status: 'error',
          message: 'Failed to start game',
        })
      }
    })
    socket.on('chat', (data: Chat) => {
      // broadcast the message
      io.to(data.roomId).emit('chat-broadcast', data);
    });
    socket.on('vote', (req: VoteReq) => {
      console.log(`user ${req.voter} wants to vote ${req.voteTarget}`);

    })
  });
};

export default socket;