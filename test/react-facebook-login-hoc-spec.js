import expect from 'expect'
import TestUtils from 'react-addons-test-utils'
import { shallow } from 'enzyme';
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
      appId: '1293827123212'
    }

    @LoginHOC(configureLoginProps)
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
            <button ref='status' onClick={ this.checkLoginState.bind(this) }>Get Facebook Login Status</button>
            <button ref='login' onClick={ this.loginFacebook.bind(this) }>Facebook Login </button>
          </div>
        );
      }
    }

    it('is React Element', () => {
      expect(TestUtils.isElement(<App />)).toEqual(true)
    })

    it('get correct props', () => {
      const wrapperProps = shallow(<App />).first().node

      expect(wrapperProps.props.scope).toEqual('public_profile')
      expect(wrapperProps.props.xfbml).toEqual(false)
      expect(wrapperProps.props.cookie).toEqual(false)
      expect(wrapperProps.props.version).toEqual(2.6)
      expect(wrapperProps.props.language).toEqual('en_US')
      expect(wrapperProps.props.appId).toEqual('1293827123212')
    })

    it('get corrent extend fb method type of function', () => {
      const wrapperFbProps = shallow(<App />).first().node.props.fb;
      expect(typeof wrapperFbProps).toEqual('object')
      expect(typeof wrapperFbProps.login).toEqual('function')
      expect(typeof wrapperFbProps.status).toEqual('function')
    })
  })
})
