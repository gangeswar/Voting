import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Menubar from './Components/Navbar';
import Login from './Components/Login';
import Admin from './Components/Admin';
import Adminadd from './Components/Admin-add';
import QueOpt from './Components/QueOpt';


class App extends Component {
  constructor() {
    super();
    this.state = {
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

addQuestionfunction(add) {
    console.log(add);
    let questions =this.state.questions;
    questions.push(add);
    this.setState({questions:questions});
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
        <Route exact path="/" component={Login} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/add_question" component={() => <Adminadd  addQuestion={this.addQuestionfunction.bind(this)} />}/>
        <Route exact path="/question" component={() => <QueOpt questions={this.state.questions} options={this.state.options} onDelete = {this.deleteQuestion.bind(this)}/>}/>

      </div>
      </Router>
    );
  }
}
}

export default App;
