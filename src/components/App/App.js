import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'

import './App.scss';

import Login from '../Login/Login'


class App extends Component {
  render() {
    return (
      <Login />
    )
  }
}

export default inject('store')(observer(App));
