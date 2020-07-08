import React, { FunctionComponent } from 'react';
import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';

import { Player } from '../../types';
import { sendVote } from '../../handlers';
import { useSocket } from '../SocketContext';
import { usePlayer, useUpdatePlayer } from '../GameContext';

interface Prop {
  player: Player[];
}

const PlayerCard: FunctionComponent<Prop> = ({ player }) => {
  const socket = useSocket();
  const myPlayer = usePlayer();
  
  const colors: string[] = [
    'pastel-red',
    'melon',
    'pale-pink',
    'bright-gray',
    'tea-green',
    'pastel-green',
    'dark-sky-blue',
    'pastel-blue',
    'light-yellow',
    'blond'
  ]

  const showStatus = (player: Player) => {
    Swal.fire({
      title: player.username,
      text: `${player.isAlive ? 'Alive' : 'Dead'}`,
      showConfirmButton: player.isAlive,
      confirmButtonText: 'Vote?',
      preConfirm: async () => {
        // send vote to server
        let status = await sendVote(socket, {
          reqId: uuid(),
          voter: myPlayer,
          voteTarget: player
        });
        if (status !== 'success') {
          Swal.fire({
            icon: 'error',
            text: status
          })
        }
      }
    })
  }

  const renderPlayer = player.map((item: Player, index: number) => {
    let degree: number = Math.PI / 180;
    let fraction: number = 360 / player.length;
    return (
      <div key={`player-${item.id}`}
      style={{
        transform: `translate(${Math.cos(fraction*index*degree)*120}px, 
          ${Math.sin(fraction*index*degree)*120}px)`
      }}>
        <div className={`player fc c-container i-absolute bg-${colors[index % colors.length]}`} 
          onClick={() => showStatus(item)}
        >
          <div className="fc c-item" >
            <img 
              className={`${item.isAlive ? 'alive': 'dead'} c-item txt-fredoka player-avatar txt-center`} 
              src={`/img/${item.avatar}.svg`} 
              alt={item.username}
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div id="table" className="fr c-item bg-red con-relative">
      {renderPlayer}
    </div>
  );
};

export default PlayerCard;