import React from 'react';

import { Player } from '../../types';

interface Prop {
  player: Player[]
}

const VoteCard = (props: Prop) => {
  const { player } = props;

  const renderCandidate = player.map((item: Player, index: number) => {
    return (
      <div key={`candidate-${index}`} className="nothing">
        <div>{item.username}</div>
      </div>
    );
  })

  return (
    <div>
      { renderCandidate }
    </div>
  );
};

export default VoteCard;