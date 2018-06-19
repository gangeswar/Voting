import React, { Component } from 'react';
import {Jumbotron, Col} from 'react-bootstrap';
import axios from 'axios';
import Question from './Question'
import './Question.css';


class QuestionItem extends Component {

  constructor() {
    super();
    this.state = {
      questions:[]
    }

  }
  componentWillMount(){
    axios.get(`http://172.24.125.116:8000/api/question/user/myquestion/${localStorage.getItem("user_id")}`)
    .then(res=>this.setState({questions:res.data}));
  }

  render() {
    var question_item;
    question_item = this.state.questions.map(list_question => {
      return(
        <OptionItem   key={list_question._id}  list_question={list_question} />
      );
    });
      return(
        <div className="QuestionItem">
        <Jumbotron>
            <Col xs={14} xsOffset={6}>
                <h2>My Voting</h2>
            </Col>
          </Jumbotron>
        {question_item}
        </div>
      );
  }
}

class OptionItem extends Component {

  constructor() {
    super();
    this.state = {
      options:[],
      radio:null,
      myVoting:1,
      validateOption:[]
    }
  }

  componentWillMount() {
      axios.get(`http://172.24.125.116:8000/api/question/${this.props.list_question._id}/option`)
      .then(res=>this.setState({options:res.data}));

      axios.get(`http://172.24.125.116:8000/api/question/user/myquestion/check/${localStorage.getItem("user_id")}`)
      .then(res=>this.setState({validateOption:res.data}));
  }


  render() {
    var option_item;
    for(var i of this.state.validateOption)
    {
      option_item = this.state.options.map(list_option => {
        return(
          <Question  key={list_option._id}  list_option={list_option} myVoting={this.state.myVoting} opt={i}/>
        );
      });
    }
    return(
      <ol className="OptionItem">
        <form >
        <Col  xsOffset={3}>
            <li><strong> . {this.props.list_question.question} {this.props.list_question.start_date} - {this.props.list_question.end_date}</strong></li><br />
            {option_item}
        </Col>
        </form>
      </ol>
    );
  }
}



export default QuestionItem;
