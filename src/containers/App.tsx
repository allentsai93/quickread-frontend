import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Main from './Main';
import Direct from './Direct';
import Header from './Header';
import styles from './styles/Global.module.css';

class App extends Component {
  render() {
    return (
      <div className={styles.div}>
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
