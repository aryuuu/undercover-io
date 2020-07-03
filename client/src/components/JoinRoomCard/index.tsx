import React, { FormEvent } from 'react';

interface Props {
  hook?: ((event: FormEvent<HTMLFormElement>) => void)
}

const JoinRoomCard = (props: Props) => {
  const { hook } = props
  return (
    <form onSubmit={hook} className="fc c-container">
      <input type="text" name="roomId" placeholder="room id" className="c-item"/>
      <button type="submit" className="c-item">Join</button>
    </form>
  );
};

export default JoinRoomCard;