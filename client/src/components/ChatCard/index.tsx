import React from 'react';

import { Chat } from '../../types';
import { usePlayer } from '../../components/GameContext';

interface Prop {
  chat: Chat[];
}

const ChatCard = (props: Prop) => {
  const myPlayer = usePlayer();
  const { chat } = props;
  const renderChat = chat.map((item: Chat, index: number) => {
    return (
      <div 
        key={`chat-${index}`} 
        className={`chat-balloon mine ${item.senderId === myPlayer.id ? 'bg-dark-sky-blue' :'bg-davys-grey'}`} 
      >
        <p className="chat-user" >{item.sender}</p>
        <p className="chat-content txt-white" >{item.content}</p>
      </div>
    );
  });

  return (
    <div id="chat-container" className="">
      { renderChat }
      <div id="chat-base"></div>
    </div>
  );
};

export default ChatCard;