import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { Tasks } from "./components/Tasks";

function App() {
  return (
    <Router>
      <div className="container p-4">
        <Switch>
          <Route path='/' component= { Tasks }/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
