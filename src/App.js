import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/navbar';
import Redux from './components/redux';
import ReduxForm from './components/reduxform';
import { Provider } from 'react-redux';
import store from './store';


class App extends Component {
    render() {
      return (
        <Provider store={store}>
          <Router>
            <div className="App">
              <Navbar />
              <Route exact path="/" component={Redux} />
              <Route exact path="/reduxform" component={ReduxForm} />
            </div>
          </Router>
        </Provider>
      );
    }
  }

export default App;
