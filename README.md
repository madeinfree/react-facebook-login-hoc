# React Facebook Login HOC
[![npm](https://img.shields.io/npm/v/react-facebook-login-hoc.svg?maxAge=2592000)](https://www.npmjs.com/package/react-facebook-login-hoc)

## What is ?

<!-- React Facebook Login Higher Order Component for you to easily to initialize and use relative method. -->
Easily for you to append facebook **root dom** and **dependencies file**

## Installation

```
npm install react-facebook-login-hoc
```

## Exposed API

* this.props.fb.status(callback(response): function) - callback function will response facebook login auth status

* this.props.fb.login(callback(response): function [,scope: object]) - callback function will response login result

* this.props.fb.logout()

## default Props

|    params    |   value  |             default value            |
|:------------:|:--------:|:------------------------------------:|
|     appId    |  string  |              Required                |
|     scope    |  string  |           public_profile             |
|     xfbml    |  boolean |                 false                |
|     cookie   |  boolean |                 false                |
|    version   |  string  |                  2.6                 |
|    language  |  string  |                  en_US               |

## Configuration

```javascript
const configureLoginProps = {
  appId: 'Your APP ID',
  scope: 'public_profile, email',
  xfbml: false,
  cookie: false,
  version: 2.6,
  language: 'en_US'
}
```

## How to use ?

```javascript
import React, { Component } from 'react'
import { render } from 'react-dom'

import LoginHOC from 'react-facebook-login-hoc'

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
    );
  }
}

export default LoginHOC(configureLoginProps)(App);
```

# License
MIT
