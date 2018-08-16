import React, { Component } from 'react';

import Navbar from './components/Base/NavBar';
import Router from './Router';

class App extends Component {
  render() {
    return (
        <div>
          <Navbar />
          <Router />
        </div>
    );
  }
}

export default App;
