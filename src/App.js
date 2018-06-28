import React, {
  Component
}
from 'react';
import {
  BrowserRouter as Router,
  Route
}
from "react-router-dom";

import Menubar from './module/base/Navbar';
import Login from './module/user/Login';
import UserProfile from './module/user/User_Profile';
import Register from './module/user/Register';
import AddQuestion from './module/question/Question_Add';
import UserManage from './module/user/User_Manage';
import QuestionManage from './module/question/Question_Manage';
import QuestionItem from './module/question/Question_Items';
import MyVoting from './module/question/My_Voting';


class App extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false
    }
  }

  componentDidCatch() {
    this.setState(state => ({...state,
      hasError: true
    }));
  }

  render() {
      if (this.state.hasError) {
        return <div > Something went wrong page not found!!! < /div>;
      }
      return (
      <Router>
        <div>
          <Menubar />
            <Route exact path="/" component={ Login }/>
            <Route exact path="/register" component={ Register } />
            <Route exact path="/question/totaluser" component={ UserManage } />
            <Route exact path="/question/totalquestion" component={ QuestionManage } />
            <Route exact path="/question/myvoting" component={ MyVoting } />
            <Route exact path="/question/add" component={ AddQuestion }/>
            <Route exact path="/question" component={ QuestionItem }/>
            <Route exact path="/user_profile" component={ UserProfile } />
        </div>
      </Router>
      );
  }
}


export default App;
