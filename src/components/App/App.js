import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import logo from '../../logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={() => this.props.store.reset()}>Seconds passed: {this.props.store.secondsPassed}</button>
          <button onClick={() => this.props.store.increase()}>Increase</button>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default inject('store')(observer(App));
