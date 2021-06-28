import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import './Login.scss'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  clearErrors = () => {
    if (this.props.store.loginState) {
      this.props.store.resetLoginError()
    }
  }

  handleUsernameChange = e => {
    this.clearErrors()
    this.setState({username: e.target.value});
  }

  handlePasswordChange = e => {
    this.clearErrors()
    this.setState({password: e.target.value});
  }

  login = e => {
    e.preventDefault()
    const {
      username,
      password
    } = this.state
    this.props.store.login({username, password})
  }

  render() {
    const error = this.props.store.loginState ? this.props.store.loginState.error : null

    return (
      <div className='login container'>
        <div className='row'>
          <div className='col'>
            <input
              id='username-input'
              type='text'
              name='username'
              placeholder='username'
              className='form-control form-control-lg'
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  this.login(e)
                }
              }}
              onChange={this.handleUsernameChange}
              value={this.state.username}
            />
          </div>
        </div>
        <div className='row pt-2'>
          <div className='col'>
            <input
              id='password-input'
              type='password'
              name='password'
              placeholder='password'
              className='form-control form-control-lg'
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  this.login(e)
                }
              }}
              onChange={this.handlePasswordChange}
              value={this.state.password}
            />
          </div>
        </div>
        <div className='row pt-2'>
          <div className='col'>
            <input
              className='btn btn-success btn-block mb-2'
              type='submit'
              onClick={this.login}
              value='Login'
            />
          </div>
        </div>
        <div className='row pt-2'>
          <div className='col'>
            {error && <div className='alert alert-danger' role='alert'>{error}</div>}
          </div>
        </div>
      </div>
    )
  }
}

export default inject('store')(observer(Login))
