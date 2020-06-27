import React from 'react';

import { Player } from '../../types';

interface Prop {
  player: Player[]
}

const VoteCard = (props: Prop) => {
  const { player } = props;

  const renderCandidate = player.map((item: Player, index: number) => {
    <div key={`candidate-${index}`} className="">
      <div>{item.username}</div>
    </div>
  })

  return (
    <div>
      { renderCandidate }
    </div>
  );
};

export default VoteCard;