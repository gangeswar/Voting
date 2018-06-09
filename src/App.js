import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {hashHistory} from "react-router-dom";
import axios from 'axios';

import Menubar from './Components/Navbar';
import Login from './Components/Login';
import UserProfile from './Components/user_profile';
import Register from './Components/Register';
import Admin from './Components/Admin';
import Adminadd from './Components/Admin-add';
import AdminUserdetail from './Components/Admin-User_detail';
import AdminTotalquestion from './Components/Admin-Total_question';
import Question_item from './Components/Question_items';


class App extends Component {
  constructor() {
    super();
    this.state = {
      register:[],
      questions : [],
      options : [],
      hasError:false
    }
  }
componentWillMount() {

    axios.get(`http://172.24.125.116:8000/api/question`)
    .then(res=>this.setState({questions:res.data}));

    axios.get(`http://172.24.125.116:8000/api/allquestion/alloption`)
    .then(res=>this.setState({options:res.data}));

    axios.get(`http://172.24.125.116:8000/api/user`)
    .then(res=>this.setState({register:res.data}));


}

componentDidCatch() {
  this.setState(state => ({...state, hasError:true}));
}

addUser(add_user) {
    let register =this.state.register;
    register.push(add_user);
    this.setState({register:register});
}

addQuestionfunction(add_question) {

    let questions =this.state.questions;
    questions.push(add_question);
    this.setState({questions:questions});
}

addOptionfunction(add_option) {

    let options =this.state.options;
    options.push(add_option);
    this.setState({options:options});
}

deleteQuestion(id) {
    let questions =this.state.questions;
    let index = questions.findIndex(x => x.question_id === id);
    questions.splice(index,1);
    this.setState({questions:questions});
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
        <Route exact path="/" component={() => <Login users={this.state.register} />}/>
        <Route exact path="/register" component={Register} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/userdetail" component={() => <AdminUserdetail userDetail={this.state.register} />} />
        <Route exact path="/admin/totalquestion" component={() => <AdminTotalquestion totalQuestion={this.state.questions} />} />
        <Route exact path="/admin/add_question" component={() => <Adminadd  addQuestion={this.addQuestionfunction.bind(this)} addOption={this.addOptionfunction.bind(this)} />}/>
        <Route exact path="/question" component={() => <Question_item questions={this.state.questions} options={this.state.options} onDelete = {this.deleteQuestion.bind(this)}/>}/>
        <Route exact path="/user_profile" component={UserProfile} />
      </div>
      </Router>
    );
  }
  }
}

export default App;
