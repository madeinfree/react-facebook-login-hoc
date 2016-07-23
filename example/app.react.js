import React, { Component } from 'react'

import LoginHOC from '../src/index'

const configureLoginProps = {
  scope: 'public_profile',
  xfbml: false,
  cookie: false,
  version: 2.6,
  language: 'en_US',
  appId: '488387194689361'
}

class App extends Component {
  constructor(props) {
    super(props)

    this.status = this.props.fb.status
    this.login = this.props.fb.login
    this.logout = this.props.fb.logout
  }
  getStatus(response) {
    if (response.authResponse) {
      this.responseApi.call(this, response.authResponse)
    }
  }
  responseApi(res) {
    console.log('token:', res.accessToken)
  }
  checkLoginState() {
    this.status(this.getStatus.bind(this))
  };
  loginFacebook() {
    this.login(this.getStatus.bind(this))
  }
  logoutFacebook() {
    this.logout()
  }
  render() {
    return (
      <div>
        <button onClick={ this.checkLoginState.bind(this) }>Get Facebook Login Status</button>
        <button onClick={ this.loginFacebook.bind(this) }>Facebook Login</button>
        <button onClick={ this.logoutFacebook.bind(this) }>Facebook Logout</button>
      </div>
    );
  }
}

export default LoginHOC(configureLoginProps)(App);
