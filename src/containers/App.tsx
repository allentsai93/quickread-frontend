import React, { Component } from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import Main from "./Main";
import Direct from "./Direct";
import Header from "./Header";
import styles from "./styles/Global.module.css";
import LandingPage from "./LandingPage";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <>
          <div className={styles.div}>
            <Header />
            <Route exact path="/news/:source" component={Main} />
            <Route path="/:url" component={Direct} />
          </div>
        </>
      </Switch>
    );
  }
}

export default App;
