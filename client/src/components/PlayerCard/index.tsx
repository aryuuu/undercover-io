import React, { FunctionComponent } from 'react';
import Swal from 'sweetalert2';

import { Player } from '../../types';

interface Prop {
  player: Player[];
}

const PlayerCard: FunctionComponent<Prop> = ({ player }) => {
  
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
      text: `${player.isAlive ? 'Alive' : 'Dead'}`
    })
  }

  const renderPlayer = player.map((item: Player, index: number) => {
    let degree: number = Math.PI / 180;
    let fraction: number = 360 / player.length;
    return (
      <div key={`player-${item.id}`}
      style={{
        transform: `translate(${Math.cos(fraction*index*degree)*100}px, ${Math.sin(fraction*index*degree)*100}px)`
      }}>
        <div className={`player fc c-container i-absolute bg-${colors[index % colors.length]}`} onClick={() => showStatus(item)}>
          <div className="c-item">
            <p className={`${item.isAlive ? "alive" : "dead"}`}>
              {item.username}
            </p>
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