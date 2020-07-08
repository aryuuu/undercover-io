import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './styles/style.css'
import { SocketProvider } from './components/SocketContext';
import { GameProvider } from './components/GameContext'
import Home from './pages/Home';
import Room from './pages/Room';

function App() {
  return (
    <SocketProvider>
      <GameProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/room" component={Room}/>
            <Route exact path="/room/:roomId" component={Room}/>
          </Switch>
        </Router>
      </GameProvider>
    </SocketProvider>
  );
}

export default App;
