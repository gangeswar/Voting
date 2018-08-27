import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import firebase from 'firebase';

class Success extends Component {
  render() {
    console.log(this.props.payment)
    return (
      <div>
        <h3>Order Summary</h3>
        <h5>Payment sucessfully processed !!!</h5>
        <a onClick={() => {firebase.auth().signOut();this.props.history.push('/shop')}}>payment logout</a>
      </div>
    )
  }
}

export default withRouter (Success);