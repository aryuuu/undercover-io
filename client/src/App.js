import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import './components/Footer';
import Home from './pages/Home';
import Room from './pages/Room';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/room" component={Room}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;
