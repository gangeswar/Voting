import React, { Component } from 'react';
import {Jumbotron, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Home from './Home'
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

    if(localStorage.getItem("admin")==1)
    {
        return(<Home/> );
    }
    else{
        return(
          <div className="QuestionItem">
          <Jumbotron>
              <Col xs={14} xsOffset={6}>
                  <h2>Questions</h2>
              </Col>
            </Jumbotron>
          {question_item}
          </div>
        );
    }
  }
}

export default QuestionItem;
