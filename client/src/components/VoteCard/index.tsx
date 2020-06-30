import React from 'react';
import Swal from 'sweetalert2';

import { Player } from '../../types';

interface Prop {
  player: Player[]
}

const VoteCard = (props: Prop) => {
  const { player } = props;
  const votePlayer = (player: Player) => {
    Swal.fire({
      title: 'You just voted',
      text: player.username,
      showCloseButton: true
    })
  }

  const renderCandidate = player.map((item: Player, index: number) => {
    return (
      <div key={`candidate-${index}`} 
        className={`bg-black-olive vote-item ${item.isAlive ? '' : 'non-votable'}`} 
        onClick={() => votePlayer(item)}
      >
        <p className="txt-white">{item.username}</p>
      </div>
    );
  })

  return (
    <div id="vote-card" className="fc c-container c-item">
      { renderCandidate }
    </div>
  );
};

export default VoteCard;