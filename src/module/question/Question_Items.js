import React, {
  Component
}
from 'react';
import {
  Jumbotron,
  Col,
  Button,
  Alert
}
from 'react-bootstrap';
import {
  Redirect
}
from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import Question from './Question';
import './Question.css';

class QuestionItem extends Component {

  constructor() {
    super();
    this.state = {
      questions: []
    }
  }

  submitQuestion(id) {
    const questions = this.state.questions;
    const index = questions.findIndex(x => x._id === id);
    questions.splice(index, 1);
    this.setState({
      questions: questions
    });
  }

  componentWillMount() {
    axios.get(`http://172.24.125.116:8000/api/question/user/${localStorage.getItem("user_id")}/availablequestion`)
      .then(res => this.setState({
        questions: res.data
      }));
  }

  render() {
      var question_item;
      question_item = this.state.questions.map(list_question => {
            return (
              <OptionItem   key={list_question._id} onDelete={this.submitQuestion.bind(this)}  list_question={list_question} />
            );
          });

      if (localStorage.getItem("user_id") != null) {
        if (localStorage.getItem("admin") === "1") {
          return ( < Home / > );
        } else {
          return (
            <div className="QuestionItem">
              <Jumbotron>
                <Col xsOffset={5}>
                  <h2>Questions</h2>
                </Col>
              </Jumbotron>
              <ol>
                {question_item}
              </ol>
            </div>
        );
      }
    } else {
        return(
          <Redirect to="/"/>
        );
    }
  }
}


class OptionItem extends Component {

  constructor() {
    super();
    this.state = {
      options: [],
      radio: null,
      click:"",
      questionItem: 0,
      radio_arr: []
    }
  }

  componentWillMount() {
    this.setState({
      options: this.props.list_question.options
    });
  }

  submitQuestion(id) {
    if (this.state.radio != null) {
      this.props.onDelete(id);
      axios.post(`http://172.24.125.116:8000/api/question/myquestion`, {
        user_id: localStorage.getItem("user_id"),
        question_id: this.props.list_question._id,
        option_id: this.state.radio
      }).then(res => {
        this.setState({
          radio_arr: res.data.option_id
        });
      })
    } else {
        this.setState({click:null});
    }
  }

  radioSubmit(selectradio) {
    this.setState({
      radio: selectradio
    });
  }

  reset() {
    this.setState({
      radio: null,
      click:"",
    });
  }

  render() {
    var option_item;
    option_item = this.state.options.map(list_option => {
      return (
        <Question key={list_option._id} clickRadio={this.radioSubmit.bind(this)} list_option={list_option} questionItem={this.state.questionItem} radio_arr={this.state.radio_arr} />
      );
    });

    return(
      <div className="OptionItem">
        <form>
          <Col  xsOffset={3}>
              <h4><li><strong> {this.props.list_question.question} <Col smOffset={8}> {this.props.list_question.start_date} - {this.props.list_question.end_date}</Col></strong></li></h4>
                {option_item}
              <Col xs={1}>
             <Button onClick={this.submitQuestion.bind(this,this.props.list_question._id)} bsStyle="success">Submit</Button>
             </Col>
             <Col xsPush={1} xs={1}>
                <Button type="reset"  onClick={this.reset.bind(this)} bsStyle="info">Clear</Button>
            </Col><br/><br/>
          </Col>
           {
           this.state.click==null && this.state.radio==null?
           <Alert bsStyle="danger">
              <strong className="right">Please Select an Option!</strong>
          </Alert>
          :null
          }
        </form>
      </div>
    );
  }
}


export default QuestionItem;
