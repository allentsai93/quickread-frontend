import React, { Component } from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import Main from "./Main";
import Direct from "./Direct";
import LandingPage from "./LandingPage";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/news/:source" component={Main} />
        <Route exact path="/:url" component={Direct} />
      </Switch>
    );
  }
}

export default App;
