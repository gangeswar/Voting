import React, { Component } from 'react'

import { withRouter } from 'react-router-dom';

class Error extends Component {
  render() {
    return (
      <div>
        <h2 style= {{color:"red"}}>ALAS:</h2>
        <h5>An error occured</h5>
      </div>
    )
  }
}

export default withRouter (Error);