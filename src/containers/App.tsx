import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Main from './Main';
import Direct from './Direct';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
            <Route exact path='/' component={Main} />
            <Route path="/:url" component={Direct} />
        </Switch>
      </div>
    );
  }
}

export default App;
