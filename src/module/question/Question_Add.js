import React, {
  Component
}
from 'react';
import axios from 'axios';
import {
  Col,
  Row,
  Jumbotron,
  Button
}
from 'react-bootstrap';
import {
  Link,
  Redirect
}
from 'react-router-dom';
import dateformat from 'dateformat';
import './Question.css';
import config from '../config.json';

class QuestionAdd extends Component {
  constructor() {
    super();
    this.state = {
      submit: false
    }
  }

  componentWillMount() {
    if (this.props.check === 0) {
      this.setState({
        check: this.props.check
      });
    } else {
      this.setState({
        check: 1
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    var optionIndex = [this.refs.optionA.value, this.refs.optionB.value,
      this.refs.optionC.value, this.refs.optionD.value
    ];
    if (this.state.check) {
      axios.post(config.url.question, {
        question: this.refs.question.value,
        start_date: this.refs.start_date.value,
        end_date: this.refs.end_date.value
      }).then(res => {
        for (let index of optionIndex) {
          axios.post(`${config.url.question}/${res.data._id}/option`, {
            option: index
          })
        }
      }).then(this.setState({
        submit: true
      })).catch(error => console.log("error"));

    } else {
      axios.put(`${config.url.question}/${localStorage.getItem("_id")}`, {
        question: this.refs.question.value,
        start_date: this.refs.start_date.value,
        end_date: this.refs.end_date.value
      }).then(res => {
        for (let index in optionIndex) {
          axios.put(`${config.url.option}/${localStorage.getItem("_id"+index)}`, {
            option: optionIndex[index]
          })
        }
      }).then(this.setState({
        submit: true
      })).catch(error => console.log("error"));

    }
  }

  back() {
    this.setState({
      submit: true
    })
  }

  render() {
      if (localStorage.getItem("user_id") != null && localStorage.getItem("admin") === "1") {
        if (this.state.submit) {
          return (
            <Redirect to="/total"/>
          );
    } else {
      if(this.state.check)
      {
        return (
          <div className="QuestionAdd">
            <Jumbotron>
                <Col xsOffset={4} smOffset={4}>
                <h1>Add-question</h1>
                </Col>
            </Jumbotron>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <Row className="row-space">
                <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                <input className="form-control" type="text" ref="question" placeholder="Question" required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                <input className="form-control" type="text" ref="optionA" placeholder="option-A" required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                <input className="form-control" type="text" ref="optionB" placeholder="option-B"required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                <input className="form-control" type="text" ref="optionC" placeholder="option-C" required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                <input className="form-control" type="text" ref="optionD" placeholder="option-D" required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                <input className="form-control" type="date" ref="start_date" required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                <input className="form-control" type="date" ref="end_date" required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={2}  xsOffset={3} sm={2} smOffset={4}>
                <Button bsStyle="success" type="submit" >Submit</Button>
                </Col>
                <Col xs={2} xsOffset={1} sm={0} smOffset={0}>
                  <Link to="/totalquestion"><Button> Back </Button></Link>
                </Col>
              </Row>
              </form>
          </div>
        );
      } else {
        for(var index in this.props.editOption)
          {
            localStorage.setItem("_id", this.props.editQuestion._id);
            localStorage.setItem("question", this.props.editQuestion.question);
            localStorage.setItem("start_date", dateformat(this.props.editQuestion.start_date,"isoDate"));
            localStorage.setItem("end_date", dateformat(this.props.editQuestion.end_date,"isoDate"));
            localStorage.setItem("option"+index, this.props.editOption[index].option);
            localStorage.setItem("_id"+index, this.props.editOption[index]._id);
          }
      return (
        <div className="QuestionAdd">
          <Jumbotron>
            <Col xsOffset={4} smOffset={4}>
              <h1>Edit-question</h1>
            </Col>
          </Jumbotron>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <Row className="row-space">
              <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
              <input className="form-control" type="text" ref="question" placeholder="Question" defaultValue={localStorage.getItem("question")} required/>
              </Col>
            </Row>
            <Row className="row-space">
              <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
              <input className="form-control" type="text" ref="optionA" placeholder="option-A" defaultValue={localStorage.getItem("option0")} required/>
              </Col>
            </Row>
            <Row className="row-space">
              <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
              <input className="form-control" type="text" ref="optionB" placeholder="option-B" defaultValue={localStorage.getItem("option1")} required/>
              </Col>
            </Row>
              <Row className="row-space">
                <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                <input className="form-control" type="text" ref="optionC" placeholder="option-C" defaultValue={localStorage.getItem("option2")} required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                <input className="form-control" type="text" ref="optionD" placeholder="option-D"  defaultValue={localStorage.getItem("option3")} required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                <input className="form-control" type="date" ref="start_date" defaultValue={localStorage.getItem("start_date")} required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                <input className="form-control" type="date" ref="end_date" defaultValue={localStorage.getItem("end_date")} required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={2}  xsOffset={3} sm={2} smOffset={4}>
                  <Button bsStyle="primary" type="submit" >Update</Button>
                </Col>
                <Col xs={2} xsOffset={1} sm={0} smOffset={0}>
                  <Button onClick={this.back.bind(this)}> Back </Button>
                </Col>
              </Row>
            </form>
        </div>
      );
    }
  }
  } else {
      return(<Redirect to="/"/> );
    }
  }
}


export default QuestionAdd;
