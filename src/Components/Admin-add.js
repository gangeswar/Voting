import React, { Component } from 'react';
import {Col, Row, Jumbotron, Button} from 'react-bootstrap'
import {Link, Redirect} from 'react-router-dom';
import './Admin-add.css';

class Admin_add extends Component {


    constructor() {
    super();
    this.state = {
        newQuestion :{},
        newOption:{},
        submit:false
    }
  }

    handleSubmit(e) {
      this.setState({newQuestion:{
        question_id  : this.refs.question_id.value,
        question  : this.refs.question.value,
        start_date  : this.refs.start_date.value,
        end_date   : this.refs.end_date.value
        }}, function(){
            this.props.addQuestion(this.state.newQuestion);
        }
      );
      this.setState({newOption:{
        option_id  : this.refs.option_id.value,
        question_id  : this.refs.question_id.value,
        option  : this.refs.option.value
        }}, function(){
            this.props.addOption(this.state.newOption);
        }
      );
      this.setState({submit:true});
      e.preventDefault();
    }

  render() {

    if(this.state.submit)
    {
      return(
        <Redirect to="/" />
      );
    }
    else{

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
              <input className="form-control" type="number" ref="question_id" placeholder="Question id"/>
            </Col>
          </Row>
          <Row className="row-space">
            <Col xs={4} xsOffset={4}>
              <input className="form-control" type="text" ref="question" placeholder="Question"/>
            </Col>
          </Row>
          <Row className="row-space">
            <Col xs={4} xsOffset={4}>
              <input className="form-control" type="number" ref="option_id" placeholder="option id" />
            </Col>
          </Row>
          <Row className="row-space">
          <Col xs={4} xsOffset={4}>
            <input className="form-control" type="text" ref="option" placeholder="option"/>
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
}

export default Admin_add;
