import React, {
  Component
}
from 'react';
import {
  Jumbotron,
  Col,
  Button,
  Alert
}
from 'react-bootstrap';
import {
  Redirect
}
from 'react-router-dom';
import axios from 'axios';
import Question from './Question';
import './Question.css';
import Pagination from '../base/Pagination';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class QuestionItem extends Component {

  constructor() {
    super();
    this.state = {
      questions: [],
      renderedQuestions: [],
      page: 1,
      update:true
    }
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentWillMount() {
    axios.get(`http://172.24.125.116:8000/api/question/user/${localStorage.getItem("user_id")}/availablequestion`)
      .then(res => this.setState({
        questions: res.data,
        renderedQuestions: res.data.slice(0, 2),
        total: res.data.length,
      }));
  }

  componentDidUpdate(){
    if(this.state.update)
    {
      setTimeout(() => {
        axios.get(`http://172.24.125.116:8000/api/question/user/${localStorage.getItem("user_id")}/availablequestion`)
          .then(res => this.setState({
            questions: res.data,
            renderedQuestions: res.data.slice((this.state.page - 1) * 2, (this.state.page - 1) * 2 + 2),
            total: res.data.length,
            update:false
          }))
      })
    }
  }

  submitQuestion(id) {
    axios.get(`http://172.24.125.116:8000/api/question/user/${localStorage.getItem("user_id")}/availablequestion`)
      .then(res => this.setState({
        questions: res.data,
        renderedQuestions: res.data.slice((this.state.page - 1) * 2, (this.state.page - 1) * 2 + 2),
        total: res.data.length,
        update:true
      }))
  }

  handlePageChange(page) {
    const renderedQuestions = this.state.questions.slice((page - 1) * 2, (page - 1) * 2 + 2);
    this.setState({page, renderedQuestions});
  }

  render() {
      const { page, total } = this.state;
      var question_item;
      question_item = this.state.renderedQuestions.map(list_question => {
            return (
              <OptionItem   key={list_question._id} onDelete={this.submitQuestion.bind(this)}  list_question={list_question}/>
            );
          });

      if (localStorage.getItem("user_id") != null && localStorage.getItem("admin")==="0") {
          return (
            <div className="QuestionItem">
              <Jumbotron>
                <Col xsOffset={4} smOffset={4}>
                  <h1>Questions</h1>
                </Col>
              </Jumbotron>
              <ReactCSSTransitionGroup
                transitionName="list-item"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={true}
                transitionEnterTimeout={500}
                transitionLeave={true}
                transitionLeaveTimeout={500}>
              <ol>
                {question_item}
              </ol>
              </ReactCSSTransitionGroup>
              <Pagination
              margin={2}
              page={page}
              count={Math.ceil(total / 2)}
              onPageChange={this.handlePageChange}
              />
            </div>

        );
    } else {
        return(
          <Redirect to="/"/>
        );
    }
  }
}


class OptionItem extends Component {

  constructor() {
    super();
    this.state = {
      options: [],
      radio: null,
      click:"",
      questionItem: 0,
      radio_arr: []
    }
  }

  componentWillMount() {
    this.setState({
      options: this.props.list_question.options
    });
  }

  submitQuestion(id) {
    if (this.state.radio != null) {
      this.props.onDelete(id);
      axios.post(`http://172.24.125.116:8000/api/question/myquestion`, {
        user_id: localStorage.getItem("user_id"),
        question_id: this.props.list_question._id,
        option_id: this.state.radio
      }).then(res => {
        this.setState({
          radio_arr: res.data.option_id
        });
      })
    } else {
        this.setState({click:null});
    }
  }

  radioSubmit(selectradio) {
    this.setState({
      radio: selectradio
    });
  }

  reset() {
    this.setState({
      radio: null,
      click:"",
    });
  }

  render() {
    var option_item;
    option_item = this.state.options.map(list_option => {
      return (
        <Question key={list_option._id} clickRadio={this.radioSubmit.bind(this)} list_option={list_option} questionItem={this.state.questionItem} radio_arr={this.state.radio_arr} />
      );
    });
    const currentDate = new Date();

    var dateString = this.props.list_question.end_date;
    var dateParts = dateString.split("/");
    var endDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    if(endDate>=currentDate)
      return(
        <div className="OptionItem">
          <form>
            <Col xsOffset={3}>
                <h4><li><strong> {this.props.list_question.question} <Col smOffset={8}> {this.props.list_question.start_date} - {this.props.list_question.end_date}</Col></strong></li></h4>
                  {option_item}
                <Col xs={1} sm={1}>
               <Button onClick={this.submitQuestion.bind(this,this.props.list_question._id)} bsStyle="success">Submit</Button>
               </Col>
               <Col xsOffset={5} smOffset={0} smPush={1} sm={1}>
                  <Button type="reset"  onClick={this.reset.bind(this)} bsStyle="info">Clear</Button>
              </Col><br/><br/>
            </Col>
             {
             this.state.click==null && this.state.radio==null?
             <Alert bsStyle="danger">
                <Col xsOffset={4} smOffset={5} >
                  <strong>Please Select an Option!</strong>
                </Col>
            </Alert>
            :null
            }
            {
            this.state.radio!=null?
            <Alert bsStyle="success">
              <Col xsOffset={4} smOffset={5} >
                <strong>Please click submit button</strong>
              </Col>
           </Alert>
           :null
           }
          </form>
        </div>
      );
    else {
      return(
        <div className="OptionItem">
          <form>
            <fieldset disabled>
              <Col  xsOffset={3}>
                  <h4><li><strong> {this.props.list_question.question} <Col smOffset={8}> {this.props.list_question.start_date} - {this.props.list_question.end_date}</Col></strong></li></h4>
                    {option_item}
                <Col xs={1} sm={1}>
                  <Button bsStyle="success">Submit</Button>
                 </Col>
                 <Col xsOffset={5} smOffset={0} smPush={1} sm={1}>
                    <Button type="reset" bsStyle="info">Clear</Button>
                </Col><br/><br/>
              </Col>
            </fieldset>
            <Alert bsStyle="warning">
              <Col xsOffset={4} smOffset={5}>
                <strong >This question expired!</strong>
              </Col>
           </Alert>
          </form>
        </div>
      );
    }
  }
}


export default QuestionItem;
