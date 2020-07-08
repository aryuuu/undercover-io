import React, {
  useState,
  ReactNode,
  useContext,
   createContext, 
} from 'react'
import socketio from 'socket.io-client';

import { dummyApiUrl } from '../../config'

interface Props {
  children?: ReactNode;
}

const SocketContext = createContext({} as SocketIOClient.Socket);

export const useSocket = () => {
  return useContext(SocketContext);
}

export const SocketProvider = (props: Props) => {
  const { children } = props;
  const [socket, setSocket] = useState(socketio(`${dummyApiUrl}/`, 
    { transports: ['polling', 'websocket']}));

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

