import React, { Component } from 'react'

const LoginHOC = ({ appId, version, language, xfbml, cookie, scope }) => (WrapperComponent) => {
  return class extends Component {

    static defaultProps = {
      scope: 'public_profile',
      xfbml: false,
      cookie: false,
      version: 2.6,
      language: 'en_US'
    }

    constructor(props) {
      super(props);

      this.getLoginStatus = (cb) => this.getStatus(cb)
      this.login = (cb, scope) => this.loginFacebook(cb, scope)
    }

    getStatus(cb) {
      window.FB.getLoginStatus(cb)
    }

    loginFacebook(cb, scope) {
      window.FB.login(cb, scope)
    }

    appendFbRoot() {
      const fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';
      document.body.appendChild(fbRoot);
    }

    init() {
      window.fbAsyncInit = () => {
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
            login: this.login
          } } />
      )
    }
  }
}

export default LoginHOC
