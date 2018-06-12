import React, { Component } from 'react';
import {Jumbotron, Grid, Row, Col, Button, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import axios from 'axios';
import add_que from '../../media/add_question.png';
import Question from './Question'
import './Question.css';


class QuestionItem extends Component {

  constructor() {
    super();
    this.state = {
      questions:[],
      options:[]
    }
  }

  componentWillMount() {
      axios.get(`http://172.24.125.116:8000/api/question`)
      .then(res=>this.setState({questions:res.data}));

      axios.get(`http://172.24.125.116:8000/api/allquestion/alloption`)
      .then(res=>this.setState({options:res.data}));
  }


  render() {
          if(localStorage.getItem("admin")==1)
          {
            return (  <div className="Admin" >
            <Jumbotron >
                <Col xs={14} xsOffset={6} >
                    <h2>Admin</h2>
                </Col>
              </Jumbotron>
              <Row className="box-space">
                <Col xsPush={3}  sm={4}  mdPush={3}>
                <Link to="/question/totaluser" className="btn btn-sq-lg btn-success">
                      <br/> <br/><br/>
                       Total User
                </Link>
                </Col>
                <Col xsPush={2} smPush={2}  md={2}>
                  <Link to="question/add"><img id="plus" src={add_que} width="170" height="170" /></Link>
                </Col>
                <Col xsPush={3} sm={2} >
                <Link to="/question/totalquestion" className="btn btn-sq-lg  btn-primary">
                       <br/> <br/><br/>
                       Total Question
                </Link>

                </Col>
                </Row>
                </div>);
          }
              else{
    var question_array=[];
    var list_question;
    var question_item;
    for(let i of this.state.questions)
    {
      question_array.push(i);
      for(let j of this.state.options)
      {
          if(i._id===j.question_id)
          {
              question_array.push(j);
          }
      }
    }

    question_item = question_array.map(list_question => {
        return(
          <Question   key={list_question._id}  list_question={list_question} />
        );
    });



              return(<div className="QuestionItem">
        <Jumbotron>
            <Col xs={14} xsOffset={6}>
                <h2>Questions</h2>
            </Col>
          </Jumbotron>
            {question_item}
                  </div>);
        }
  }
}

export default QuestionItem;
