import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Question extends Component {

  render() {
    return (
      <ol className="Question">
        <Col  xsOffset={3}>
          <li><strong> . {this.props.list_question.question} {this.props.list_question.start_date} - {this.props.list_question.end_date}</strong></li><br />
          <input type="radio" name={this.props.list_question.question_id} />{this.props.list_question.option}<br />
        </Col>
      </ol>
    );
  }
}

export default Question;
