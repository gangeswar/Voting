import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

class Cancel extends Component {
  render() {
    console.log(this.props.payment)
    return (
      <div>
        <h3>Order Summary</h3>
        <h5>Payment canceled !!!</h5>
      </div>
    )
  }
}

export default withRouter (Cancel);