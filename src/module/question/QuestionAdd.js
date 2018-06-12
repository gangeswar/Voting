import React, { Component } from 'react';
import axios from 'axios';
import {Col, Row, Jumbotron, Button} from 'react-bootstrap'
import {Link, Redirect} from 'react-router-dom';
import './Question.css';

class AddQuestion extends Component {
    constructor() {
    super();
    this.state = {
        newQuestion :{},
        newOption:{},
        submit:false
    }
  }

    handleSubmit(e) {
      e.preventDefault();
      var optionIndex = [this.refs.optionA.value,this.refs.optionB.value,this.refs.optionC.value,this.refs.optionD.value];

      for(let index of optionIndex)
      {
        console.log(index);
      }

      axios.post(`http://172.24.125.116:8000/api/question`, {
        question  : this.refs.question.value,
        start_date  : this.refs.start_date.value,
        end_date   : this.refs.end_date.value
      }).then(res => {
        console.log(res.data._id);
        for(let index of optionIndex)
        {
          axios.post(`http://172.24.125.116:8000/api/question/${res.data._id}/option`, {
          option: index
        }
      )
      }

    }
    ).catch(error => console.log("error"));
    this.setState({submit:true});
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
      <div className="AddQuestion">
      <Jumbotron>
          <Col xs={14} xsOffset={6}>
              <h2>Add-question</h2>
          </Col>
        </Jumbotron>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Row className="row-space">
            <Col xs={4} xsOffset={4}>
              <input className="form-control" type="text" ref="question" placeholder="Question"/>
            </Col>
          </Row>
          <Row className="row-space">
          <Col xs={4} xsOffset={4}>
            <input className="form-control" type="text" ref="optionA" placeholder="option-A"/>
          </Col>
          </Row>
          <Row className="row-space">
          <Col xs={4} xsOffset={4}>
            <input className="form-control" type="text" ref="optionB" placeholder="option-B"/>
          </Col>
          </Row>
          <Row className="row-space">
          <Col xs={4} xsOffset={4}>
            <input className="form-control" type="text" ref="optionC" placeholder="option-C"/>
          </Col>
          </Row>
          <Row className="row-space">
          <Col xs={4} xsOffset={4}>
            <input className="form-control" type="text" ref="optionD" placeholder="option-D"/>
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

export default AddQuestion;
