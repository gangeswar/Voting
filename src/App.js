import React, {
  Component
}
from 'react';
import {
  BrowserRouter as Router,
  Route, Switch, Redirect
}
from "react-router-dom";

import Menubar from './module/base/Navbar';
import Login from './module/user/Login';
import Register from './module/user/Register';
import AddQuestion from './module/question/Question_Add';
import UserManage from './module/user/User_Manage';
import Home from './module/question/Home';
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
            <Switch>
              <Route exact path="/user_profile/:userId" component={ Register } />
              <Route exact path="/register" component={ Register } />
            </Switch>
            <Switch>
              <Route exact path="/report/:questionId" component={ Home }/>
              <Route exact path="/report" component={ Home }/>
            </Switch>
            <Route exact path="/totaluser" component={ UserManage } />
            <Switch>
              <Redirect from='/total' to='/totalquestion/'/>
              <Route path='/totalquestion/' component={QuestionManage}/>
            </Switch>
            <Route exact path="/question/myvoting" component={ MyVoting } />
            <Route exact path="/question/add" component={ AddQuestion }/>
            <Route exact path="/question" component={ QuestionItem }/>
        </div>
      </Router>
      );
  }
}


export default App;
