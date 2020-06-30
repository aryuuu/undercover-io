import React from 'react';

import { Player } from '../../types';

interface Prop {
  player: Player[];
}

const PlayerCard = (props: Prop) => {
  const { player } = props;

  const renderPlayer = player.map((item: Player, index: number) => {
    return (
      <div className="player fc c-container bg-blue i-absolute" key={`player-${item.id}`}>
        <div className="c-item">
          <p className={`${item.isAlive ? "alive" : "dead"}`}>
            {item.username}
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="fr c-item bg-red con-relative">
      {renderPlayer}
    </div>
  );
};

export default PlayerCard;