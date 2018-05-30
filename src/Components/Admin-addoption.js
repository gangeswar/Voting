import React, { Component } from 'react';
import {Col, Row, Jumbotron, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import './Admin-add.css';

class Admin_addoption extends Component {


    constructor() {
    super();
    this.state = {
        newOption:{}
    }
  }

    handleSubmit(e) {
      this.setState({newOption:{
        option_id  : this.refs.option_id.value,
        question_id  : this.refs.question_id.value,
        option  : this.refs.option.value
      }}, function(){
          this.props.addOption(this.state.newOption);
      }
    );
      e.preventDefault();
      alert("added");
    }

  render() {
    console.log(this.props.question_id);
    return (
      <div className="Admin-add">
      <Jumbotron>
          <Col xs={14} xsOffset={6}>
              <h2>Add-option</h2>
          </Col>
        </Jumbotron>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Row className="row-space">
            <Col xs={4} xsOffset={4}>
              <input className="form-control" type="number" ref="option_id" placeholder="option id" />
            </Col>
          </Row>
          <Row className="row-space">
            <Col xs={4} xsOffset={4}>
              <input className="form-control" type="number" ref="question_id" placeholder="question id" />
            </Col>
            </Row>
            <Row className="row-space">
            <Col xs={4} xsOffset={4}>
              <input className="form-control" type="text" ref="option" placeholder="option"/>
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

export default Admin_addoption;
