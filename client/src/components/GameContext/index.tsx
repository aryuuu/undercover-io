import React, { 
  useState,
  ReactNode,
  useContext,
  createContext,
  
} from 'react';
import { v4 as uuid } from 'uuid';

import { Player, Room } from '../../types';
// import Player from '../../modules/Player'

interface Props {
  children: ReactNode;
}

const PlayerContext = createContext({} as Player);
const UpdatePlayerContext = createContext({});
const RoomContext = createContext({} as Room);

export const useRoom = () => {
  return useContext(RoomContext);
}
export const usePlayer = () => {
  return useContext(PlayerContext);
}
export const useUpdatePlayer = () => {
  return useContext(UpdatePlayerContext)
}

export const GameProvider = (props: Props) => {
  const { children } = props;
  const [room, setRoom] = useState({
    id: '',
    host: '',
    players: [],
    playerSlot: 0,
    undercoverSlot: 0,
    mrwhiteSlot: 0,
    isPlaying: false,
  } as Room);
  const [player, setPlayer] = useState({
    id: uuid(),
    username: '',
    isHost: false,
    isAlive: true,
    score: 0,
    avatar: 'bone'
  } as Player);

  return (
    <RoomContext.Provider value={room}>
      <PlayerContext.Provider value={player}>
        <UpdatePlayerContext.Provider value={setPlayer}>
          {children}
        </UpdatePlayerContext.Provider>
      </PlayerContext.Provider>
    </RoomContext.Provider>
  );
};
