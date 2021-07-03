import React from 'react';
import { observer, Provider } from 'mobx-react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import './App.scss';

import { RootStore, AuthStore } from '../../stores';
import { Login, Home, NotFound, ProtectedRoute } from '../';

const stores = { RootStore, AuthStore };

const App = observer(() => {
  return (
    <Provider {...stores}>
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
    </Provider>
  );
});

export default App;
