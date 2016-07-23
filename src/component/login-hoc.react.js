import React, { Component } from 'react'

const LoginHOC = ({ appId, version, language, xfbml, cookie, scope }) => (WrapperComponent) => {
  return class extends Component {

    static defaultProps = {
      scope: scope || 'public_profile',
      xfbml: xfbml || false,
      cookie: cookie || false,
      version: version || 2.6,
      language: language || 'en_US',
      appId: appId || console.error('AppId Error: you must be have appId')
    }

    constructor(props) {
      super(props);

      this.getLoginStatus = (cb) => this.getStatus(cb)
      this.login = (cb, scope) => this.loginFacebook(cb, scope)
      this.logout = () => this.logoutFacebook()
    }

    getStatus(cb) {
      window.FB.getLoginStatus(cb)
    }

    loginFacebook(cb, scope) {
      window.FB.login(cb, scope)
    }

    logoutFacebook() {
      window.FB.logout()
    }

    appendFbRoot() {
      const fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';
      document.body.appendChild(fbRoot);
    }

    init() {
      window.fbAsyncInit = () => {
        console.log('init')
        window.FB.init({
          version: `v${version}` || `v${this.props.version}`,
          appId: appId || this.props.appId,
          xfbml: xfbml || this.props.xfbml,
          cookie: cookie || this.props.cookie,
        })
      }
    }

    loadSDK(language) {
      ((d, s, id) => {
        const element = d.getElementsByTagName(s)[0];
        const fjs = element;
        let js = element;
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = `//connect.facebook.net/${language}/all.js`;
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    }

    componentDidMount() {
      //init SDK
      this.appendFbRoot()
      this.init.call(this)
      this.loadSDK(language)
    }

    render() {
      return (
        <WrapperComponent
          { ...this.props }
          fb={ {
            status: this.getLoginStatus,
            login: this.login,
            logout: this.logout
          } } />
      )
    }
  }
}

export default LoginHOC
