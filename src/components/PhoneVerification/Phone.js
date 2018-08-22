import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Cart from '../Product/Cart';
import '../../base';

class Phone extends Component {

  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        isSignedIn: !!user
      })
    })
  }

  render() {
    return (
      <div className="App">
        {
          this.state.isSignedIn ? (<Cart />) : (
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />

          )}
      </div>
    );
  }
}

export default Phone;