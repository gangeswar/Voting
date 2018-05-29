import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class User extends Component {

  deleteQuestion(id){
    this.props.onDelete(id);
  }

  render() {
    return (
      <div className="User">
        <Col  xsOffset={4}>
          <strong>{this.props.list_question.question_id} . {this.props.list_question.question} {this.props.list_question.start_date} - {this.props.list_question.end_date}</strong><a href="#" onClick={this.deleteQuestion.bind(this,this.props.list_question.question_id)} >X</a><br />
          <input type="radio" name={this.props.list_question.question_id} />{this.props.list_question.option}<br />
        </Col>
      </div>
    );
  }
}

export default User;
