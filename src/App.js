import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {hashHistory} from "react-router-dom";


import Menubar from './module/base/Navbar';
import Login from './module/user/Login';
import UserProfile from './module/user/user_profile';
import Register from './module/user/Register';
import AddQuestion from './module/question/QuestionAdd';
import Totaluser from './module/user/TotalUser';
import Totalquestion from './module/question/TotalQuestion';
import QuestionItem from './module/question/Question_items';


class App extends Component {
  constructor() {
    super();
    this.state = {
      hasError:false
    }
  }

componentDidCatch() {
  this.setState(state => ({...state, hasError:true}));
}

render() {
if(this.state.hasError)
  {
    return <div>Something went wrong</div>;
  }
  else{
  return (
      <Router history={hashHistory}>
      <div className="App">
        <Menubar />
        <Route exact path="/" component={ Login }/>
        <Route exact path="/register" component={ Register } />
        <Route exact path="/question/totaluser" component={ Totaluser } />
        <Route exact path="/question/totalquestion" component={ Totalquestion } />
        <Route exact path="/question/add" component={ AddQuestion }/>
        <Route exact path="/question" component={ QuestionItem }/>
        <Route exact path="/user_profile" component={ UserProfile } />
      </div>
      </Router>
    );
  }
}
}

export default App;
