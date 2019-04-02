import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import Main from './Main';
import Direct from './Direct';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/" >Main</Link>
        </header>
        <Switch>
            <Route exact path='/' component={Main} />
            <Route path="/:url" component={Direct} />
        </Switch>
      </div>
    );
  }
}

export default App;
