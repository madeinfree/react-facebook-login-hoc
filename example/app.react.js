import React, { Component } from 'react'

import LoginHOC from '../dist/react-facebook-login-hoc'

const configureLoginProps = {
  scope: 'public_profile',
  xfbml: false,
  cookie: false,
  version: 2.6,
  language: 'en_US',
  appId: 'Your APP ID'
}

class App extends Component {
  constructor(props) {
    super(props);

    this.status = this.props.fb.status
    this.login = this.props.fb.login
  }
  getStatus(response) {
    if (response.authResponse) {
      this.responseApi(response.authResponse);
    }
  }
  checkLoginState() {
    this.status(this.getStatus)
  };
  loginFacebook() {
    this.login(this.getStatus)
  }
  render() {
    return (
      <div>
        <button onClick={ this.checkLoginState.bind(this) }>Get Facebook Login Status</button>
        <button onClick={ this.loginFacebook.bind(this) }>Facebook Login </button>
      </div>
    );
  }
}

export default LoginHOC(configureLoginProps)(App);
