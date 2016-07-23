import expect from 'expect'
import TestUtils from 'react-addons-test-utils'
import React, { PropTypes, Component } from 'react'
import LoginHOC from '../src/index'

describe('React', () => {
  describe('LoginHOC', () => {

    const configureLoginProps = {
      scope: 'public_profile',
      xfbml: false,
      cookie: false,
      version: 2.6,
      language: 'en_US',
      appId: 'Your APP ID'
    }

    @LoginHOC(configureLoginProps)
    class App extends Component {
      render() {
        return (
          <div>
            <button onClick={ this.checkLoginState.bind(this) }>Get Facebook Login Status</button>
            <button onClick={ this.loginFacebook.bind(this) }>Facebook Login </button>
          </div>
        );
      }
    }
  })
})
