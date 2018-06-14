import React, { Component } from 'react';
import {Jumbotron, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Home from './Home'
import Question from './Question'
import './Question.css';


class QuestionItem extends Component {

  constructor() {
    super();
    this.state = {
      questions:[]
    }
  }

  componentWillMount() {
      axios.get(`http://172.24.125.116:8000/api/question/user/availablequestion/${localStorage.getItem("user_id")}`)
      .then(res=>this.setState({questions:res.data}));
  }

  componentDidUpdate(prevProps, prevState) {
         axios.get(`http://172.24.125.116:8000/api/question/user/availablequestion/${localStorage.getItem("user_id")}`).then(res => {
           this.setState({questions:res.data})
       })
 }

  render() {
    var question_item;
    question_item = this.state.questions.map(list_question => {
        return(
          <OptionItem   key={list_question._id}  list_question={list_question} />
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

class OptionItem extends Component {

  constructor() {
    super();
    this.state = {
      options:[],
      radio:null,
      questionItem:0,
      radio_arr:[]
    }
  }

  componentWillMount() {
      axios.get(`http://172.24.125.116:8000/api/question/${this.props.list_question._id}/option`)
      .then(res=>this.setState({options:res.data}));
  }

  questionSubmit(e){
    e.preventDefault();
    axios.post(`http://172.24.125.116:8000/api/question/myquestion`, {
      user_id : localStorage.getItem("user_id"),
      question_id : this.props.list_question._id,
      option_id : this.state.radio
    }).then(res=>{
      console.log(res.data.option_id);
        this.setState({radio_arr:res.data.option_id});
    })
    console.log("user_id:"+localStorage.getItem("user_id"));
    console.log("question_id:"+ this.props.list_question._id)
    console.log("radio_button_id:"+this.state.radio);

  }

  radioSubmit(selectradio) {
    this.setState({radio:selectradio});
  }

  render() {

    var option_item;
    option_item = this.state.options.map(list_option => {
        return(
          <Question  key={list_option._id}  clickRadio = {this.radioSubmit.bind(this)} list_option={list_option} questionItem={this.state.questionItem} radio_arr={this.state.radio_arr} />
        );
    });

        return(
          <ol className="OptionItem">
            <form onSubmit={this.questionSubmit.bind(this)} >
            <Col  xsOffset={3}>
                <li><strong> . {this.props.list_question.question} {this.props.list_question.start_date} - {this.props.list_question.end_date}</strong></li><br />
                {option_item}
                <Button type="submit" bsStyle="success">Submit</Button>
            </Col>
            </form>
          </ol>
        );
  }
}


export default QuestionItem;
