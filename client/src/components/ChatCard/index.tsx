import React from 'react';

import { Chat } from '../../types';

interface Prop {
  chat: Chat[];
}

const ChatCard = (props: Prop) => {
  const { chat } = props;
  const renderChat = chat.map((item: Chat, index: number) => {
    return (
      <div key={`chat-${index}`} className="chat-balloon mine bg-davys-grey" >
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