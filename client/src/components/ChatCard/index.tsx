import React from 'react';

import { Chat } from '../../types';

interface Prop {
  chat: Chat[];
}

const ChatCard = (props: Prop) => {
  const { chat } = props;
  const renderChat = chat.map((item: Chat, index: number) => {
    return (
      <div key={`chat-${index}`} className="" >
        <p className="" >{item.sender}</p>
        <p className="" >{item.content}</p>
      </div>
    );
  });

  return (
    <div>
      { renderChat }
    </div>
  );
};

export default ChatCard;