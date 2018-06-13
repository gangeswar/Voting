import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col, Button, Radio} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import QuestionItem from './Question_Items'

class Question extends Component {
  constructor(){
    super();
    this.state={
      radioValue:null
    }
  }

  click(event){
    this.setState({radioValue:event.target.value},function() {
      this.props.clickRadio(this.state.radioValue);

    });
  }

  render() {
    return (
      <ol className="Question">
          <Radio name={this.props.list_option.question_id} value= {this.props.list_option._id} onChange={this.click.bind(this)}>{this.props.list_option.option}</Radio>
      </ol>
    );
  }
}

export default Question;
