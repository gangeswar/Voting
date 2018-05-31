import React, { Component } from 'react';
import {Jumbotron, Grid, Row, Col, Button, Image} from 'react-bootstrap'
import User from './User'

class Question_item extends Component {

  deleteQuestion(id){
      this.props.onDelete(id);
  }

  render() {
    var question_array=[];
    var list_question;
    var question_item;
    for(let i of this.props.questions)
    {
      question_array.push(i);
      for(let j of this.props.options)
      {
          if(i.question_id==j.question_id)
          {
              question_array.push(j);
          }
      }
    }
    question_item = question_array.map(list_question => {
        return(
          <User onDelete={this.deleteQuestion.bind(this)}   key={list_question.question_id}  list_question={list_question} />
        );
    });

    return (
      <div className="Question_item">
      <Jumbotron>
          <Col xs={14} xsOffset={6}>
              <h2>User</h2>
          </Col>
        </Jumbotron>
          {question_item}
      </div>
    );
  }
}

export default Question_item;
