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
      appId: 'Your APP ID'
    }

    @LoginHOC(configureLoginProps)
    class App extends Component {
      constructor(props) {
        super(props);

        this.getLoginStatus = (cb) => this.getStatus(cb)
        this.login = (cb, scope) => this.loginFacebook(cb, scope)
      }
      render() {
        return (
          <div>
            <button ref='status' onClick={ this.checkLoginState }>Get Facebook Login Status</button>
            <button ref='login' onClick={ this.loginFacebook }>Facebook Login </button>
          </div>
        );
      }
    }

    it('is React Element', () => {
      expect(TestUtils.isElement(<App />)).toEqual(true)
    })

    it('get correct props', () => {
      const wrapper = TestUtils.renderIntoDocument(
        <App />
      )

      expect(wrapper.props.scope).toEqual('public_profile')
      expect(wrapper.props.xfbml).toEqual(false)
      expect(wrapper.props.cookie).toEqual(false)
      expect(wrapper.props.version).toEqual(2.6)
      expect(wrapper.props.language).toEqual('en_US')
    })

    it('get corrent extend fb method type of function', () => {
      const wrapperFbProps = shallow(<App />).first().node.props.fb;
      expect(typeof wrapperFbProps).toEqual('object')
      expect(typeof wrapperFbProps.login).toEqual('function')
      expect(typeof wrapperFbProps.status).toEqual('function')
    })
  })
})
