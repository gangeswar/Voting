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
import './Question.css';
import dateformat from 'dateformat';

class QuestionAdd extends Component {
  constructor() {
    super();
    this.state = {
      newQuestion: {},
      newOption: {},
      submit: false,
      check: 0
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

  handleSubmit(e) {
    e.preventDefault();
    var optionIndex = [this.refs.optionA.value, this.refs.optionB.value,
      this.refs.optionC.value, this.refs.optionD.value
    ];
    if (this.state.check) {
      axios.post(`http://172.24.125.116:8000/api/question/`, {
        question: this.refs.question.value,
        start_date: this.refs.start_date.value,
        end_date: this.refs.end_date.value
      }).then(res => {
        for (let index of optionIndex) {
          axios.post(`http://172.24.125.116:8000/api/question/${res.data._id}/option`, {
            option: index
          })
        }
      }).then(this.setState({
        submit: true
      })).catch(error => console.log("error"));

    } else {
      axios.put(`http://172.24.125.116:8000/api/question/${localStorage.getItem("_id")}`, {
        question: this.refs.question.value,
        start_date: this.refs.start_date.value,
        end_date: this.refs.end_date.value
      }).then(res => {
        for (let index in optionIndex) {
          axios.put(`http://172.24.125.116:8000/api/question/${localStorage.getItem("_id")}/option/${localStorage.getItem("_id"+index)}`, {
            option: optionIndex[index]
          })
        }
      }).then(this.setState({
        submit: true
      })).catch(error => console.log("error"));

    }
  }

  render() {
      if (localStorage.getItem("user_id") != null && localStorage.getItem("admin") === "1") {
        if (this.state.submit) {
          return (
            <Redirect to="/"/>
          );
    } else {
      if(this.state.check)
      {
        return (
          <div className="QuestionAdd">
            <Jumbotron>
                <Col xs={14} xsOffset={6}>
                <h2>Add-question</h2>
                </Col>
            </Jumbotron>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <Row className="row-space">
                <Col xs={4} xsOffset={4}>
                <input className="form-control" type="text" ref="question" placeholder="Question" required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={4} xsOffset={4}>
                <input className="form-control" type="text" ref="optionA" placeholder="option-A" required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={4} xsOffset={4}>
                <input className="form-control" type="text" ref="optionB" placeholder="option-B"required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={4} xsOffset={4}>
                <input className="form-control" type="text" ref="optionC" placeholder="option-C" required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={4} xsOffset={4}>
                <input className="form-control" type="text" ref="optionD" placeholder="option-D" required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={4} xsOffset={4}>
                <input className="form-control" type="date" ref="start_date" required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={4} xsOffset={4}>
                <input className="form-control" type="date" ref="end_date" required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={2}  xsOffset={4}>
                <Button bsStyle="success" type="submit" >Submit</Button>
                </Col>
                <Col>
                <Button><Link to="/"> Back</Link> </Button>
                </Col>
              </Row>
              </form>
          </div>
        );
      } else {
        for(var i in this.props.editOption)
          {
            localStorage.setItem("_id", this.props.editQuestion._id);
            localStorage.setItem("question", this.props.editQuestion.question);
            localStorage.setItem("start_date", dateformat(this.props.editQuestion.start_date,"isoDate"));
            localStorage.setItem("end_date", dateformat(this.props.editQuestion.end_date,"isoDate"));
            localStorage.setItem("option"+i, this.props.editOption[i].option);
            localStorage.setItem("_id"+i, this.props.editOption[i]._id);
          }
      return (
        <div className="QuestionAdd">
          <Jumbotron>
            <Col xs={14} xsOffset={6}>
            <h2>Edit-question</h2>
            </Col>
          </Jumbotron>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <Row className="row-space">
              <Col xs={4} xsOffset={4}>
              <input className="form-control" type="text" ref="question" placeholder="Question" defaultValue={localStorage.getItem("question")} required/>
              </Col>
            </Row>
            <Row className="row-space">
              <Col xs={4} xsOffset={4}>
              <input className="form-control" type="text" ref="optionA" placeholder="option-A" defaultValue={localStorage.getItem("option0")} required/>
              </Col>
            </Row>
            <Row className="row-space">
              <Col xs={4} xsOffset={4}>
              <input className="form-control" type="text" ref="optionB" placeholder="option-B" defaultValue={localStorage.getItem("option1")} required/>
              </Col>
            </Row>
              <Row className="row-space">
                <Col xs={4} xsOffset={4}>
                <input className="form-control" type="text" ref="optionC" placeholder="option-C" defaultValue={localStorage.getItem("option2")} required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={4} xsOffset={4}>
                <input className="form-control" type="text" ref="optionD" placeholder="option-D"  defaultValue={localStorage.getItem("option3")} required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={4} xsOffset={4}>
                <input className="form-control" type="date" ref="start_date" defaultValue={localStorage.getItem("start_date")} required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={4} xsOffset={4}>
                <input className="form-control" type="date" ref="end_date" defaultValue={localStorage.getItem("end_date")} required/>
                </Col>
              </Row>
              <Row className="row-space">
                <Col xs={2}  xsOffset={4} >
                  <Button bsStyle="primary" type="submit" >Update</Button>
                </Col>
                <Col>
                  <Button><Link to="/"> Back</Link> </Button>
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
