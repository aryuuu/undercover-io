import React from 'react';

import { Log } from '../../types';

interface Prop {
  log: Log[];
}

const LogCard = (props: Prop) => {
  const { log } = props;

  const renderLog = log.map((item: Log, index: number) => {
    return (
      <div key={`log-${index}`}>
        <p className={`${item.type}-log`}>{item.content}</p>
      </div>
    );
  });

  return (
    <div>
      { renderLog }
      <div id="log-base"></div>
    </div>
  );
};

export default LogCard;