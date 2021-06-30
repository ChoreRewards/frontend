import React, { Component } from 'react';
import { inject, observer, Provider } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.scss';

import { RootStore, AuthStore } from '../../stores';
import { Login, Home, ProtectedRoute } from '../';

const stores = { RootStore, AuthStore };

const App = observer(() => {
  return (
    <Provider {...stores}>
      <Router>
        <Switch>
          <ProtectedRoute path="/home" component={ComponentA} />
          <Route path="/" exact component={Home} />
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
});

export default App;

// TODO - this is just an example for the ProtectedRoute
// Delete when we've got something useful
const ComponentA = inject(
  'AuthStore',
  'RootStore'
)(
  observer(
    class ComponentA extends Component {
      render() {
        return <h1>Hello Protected</h1>;
      }
    }
  )
);
