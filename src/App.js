import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Menubar from './Components/Navbar';
import Login from './Components/Login';
import Register from './Components/Register';
import Admin from './Components/Admin';
import Adminadd from './Components/Admin-add';
import Adminaddoption from './Components/Admin-addoption';
import QueOpt from './Components/QueOpt';


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
    this.setState( {questions : [
	{
		"question_id"  : 1,
		"question"  : "Water vapor is?",
		"start_date"  : "18-May-2018",
		"end_date"   : "25-May-2018"
	},
	{
		"question_id"  : 2,
		"question"  : "At what time of day is the relative humidity normally at a minimum?",
		"start_date"  : "20-May-2018",
		"end_date"   : "27-May-2018"
	},
	{
		"question_id"  : 3,
		"question"  : "Salinization is ?",
		"start_date"  : "19-May-2018",
		"end_date"   : "26-May-2018"
	}
]
});
this.setState( {options : [
    {
      "option_id" : 1,
      "question_id" : 1,
      "option" : "A gas"
    },
    {
      "option_id" : 2,
      "question_id" : 1,
      "option" : "A cloud droplet"
    },
    {
      "option_id" : 3,
      "question_id" : 1,
      "option" : "A rain drop"
    },
    {
      "option_id" : 4,
      "question_id" : 1,
      "option" : "A snowflake"
    },
    {
      "option_id" : 5,
      "question_id" : 2,
      "option" : "When the air temperature is highest"
    },
    {
      "option_id" : 6,
      "question_id" : 2,
      "option" : "Just before sunrise"
    },
    {
      "option_id" : 7,
      "question_id" : 2,
      "option" : "About midnight"
    },
    {
      "option_id" : 8,
      "question_id" : 2,
      "option" : "When the air temperature is lowest"
    },
    {
      "option_id" : 9,
      "question_id" : 3,
      "option" : "Accumulation of salts in water"
    },
    {
      "option_id" : 10,
      "question_id" : 3,
      "option" : "Accumulation of salts in soil"
    },
    {
      "option_id" : 11,
      "question_id" : 3,
      "option" : "Accumulation of salts in body "
    },
    {
      "option_id" : 12,
      "question_id" : 3,
      "option" : "Accumulation of salts in animals"
    }
]
});
}

componentDidCatch() {
  this.setState(state => ({...state, hasError:true}));
}

addUser(add_user) {
    console.log(add_user);
    let register =this.state.register;
    register.push(add_user);
    this.setState({register:register});
}

addQuestionfunction(add_question) {
    console.log(add_question);
    let questions =this.state.questions;
    questions.push(add_question);
    this.setState({questions:questions});
}

addOptionfunction(add_option) {
    console.log(add_option);
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
      <Router>
      <div className="App">
        <Menubar />
        <Route exact path="/" component={() => <Login users={this.state.register} />}/>
        <Route exact path="/register" component={() => <Register registerUser={this.addUser.bind(this)}/>}/>
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/add_question" component={() => <Adminadd  addQuestion={this.addQuestionfunction.bind(this)} />}/>
        <Route exact path="/admin/add_question/option" component={() => <Adminaddoption  question_id={this.state.questions.question_id} addOption={this.addOptionfunction.bind(this)} />}/>
        <Route exact path="/question" component={() => <QueOpt questions={this.state.questions} options={this.state.options} onDelete = {this.deleteQuestion.bind(this)}/>}/>

      </div>
      </Router>
    );
  }
}
}

export default App;
