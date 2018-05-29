import React, { Component } from 'react';
import {Col, Row, Jumbotron, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import './Admin-add.css';

class Admin_add extends Component {


    constructor() {
    super();
    this.state = {
        newQuestion :{}
    }
  }

    handleSubmit(e) {
      console.log(this.refs.question.value);
      this.setState({newQuestion:{
        question_id  : this.refs.question_id.value,
        question  : this.refs.question.value,
        start_date  : this.refs.start_date.value,
        end_date   : this.refs.end_date.value
      }}, function(){
          this.props.addQuestion(this.state.newQuestion);
      }
    );
      e.preventDefault();
    }

  render() {
    return (
      <div className="Admin-add">
      <Jumbotron>
          <Col xs={14} xsOffset={6}>
              <h2>Add-question</h2>
          </Col>
        </Jumbotron>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Row className="row-space">
            <Col xs={4} xsOffset={4}>
              <input className="form-control" type="number" ref="question_id" />
            </Col>
          </Row>
          <Row className="row-space">
            <Col xs={4} xsOffset={4}>
              <input className="form-control" type="text" ref="question" />
            </Col>
            </Row>
            <Row className="row-space">
            <Col xs={4} xsOffset={4}>
              <input className="form-control" type="date" ref="start_date"/>
            </Col>
            </Row>
            <Row className="row-space">
            <Col xs={4} xsOffset={4}>
              <input className="form-control" type="date" ref="end_date"/>
            </Col>
            </Row>
            <Row className="row-space">
            <Col xs={2} xsOffset={5}>
                <Button bsStyle="success" type="submit" >Submit</Button>
              </Col>
              </Row>
            </form>
      </div>
    );
  }
}

export default Admin_add;
