import React from "react";
import { observer } from "mobx-react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import "./App.scss";

import { Login, Home, NotFound, ProtectedRoute } from "../";

const App = observer(() => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <ProtectedRoute path="/home" component={Home} />
        <Route path="/login">
          <Login />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
});

export default App;
