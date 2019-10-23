import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './screens/home'
import Amplify from 'aws-amplify'
import aws_config from "./aws-exports"
import { withAuthenticator, Authenticator } from 'aws-amplify-react'

Amplify.configure(aws_config)

class App extends Component {
  render() {
    return (
      <div>
        <Authenticator usernameAttributes='email'/>
        <Home />
      </div>
      
    );
  }
}

// export default withAuthenticator(App, true);
export default App;