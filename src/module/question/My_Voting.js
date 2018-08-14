import React, {
  Component
}
from 'react';
import {
  Jumbotron,
  Col
}
from 'react-bootstrap';
import {
  Redirect
}
from 'react-router-dom';
import axios from 'axios';
import Question from './Question';
import Pagination from '../base/Pagination';
import './Question.css';
import config from '../config.json';

class QuestionItem extends Component {

  constructor() {
    super();
    this.state = {
      questions: [],
      renderedQuestions: [],
      page: 1
    }
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentWillMount() {
    axios.get(`${config.url.userQuestion}/${localStorage.getItem("user_id")}/myquestion`)
      .then(res => {
        setTimeout(() => {
          this.setState({ questions:res.data, renderedQuestions: res.data.slice(0, 1), total: res.data.length});
        })
      });
  }

  handlePageChange(page) {
    const renderedQuestions = this.state.questions.slice((page - 1), (page - 1) + 1);
    this.setState({page, renderedQuestions});
  }

  render() {
      const { page, total } = this.state;
      if (localStorage.getItem("user_id") != null && localStorage.getItem("admin") === "0") {
        var questionItem;
        questionItem = this.state.renderedQuestions.map(list_question => {
          return (
            <OptionItem key={list_question.questions._id}  list_question={list_question.questions} />
          );
        });
        return(
          <div className="QuestionItem">
            <Jumbotron>
              <Col xsOffset={4} smOffset={4}>
                <h1>My Voting</h1>
              </Col>
            </Jumbotron>
            {
            questionItem.length===0?<Col smOffset={4}><h2>There is no data to display</h2></Col>
            :<ol>
              {questionItem}
            </ol>
            }
            <Pagination
              margin={2}
              page={page}
              count={Math.ceil(total)}
              onPageChange={this.handlePageChange}
            />
          </div>
      );
  } else {
      return(<Redirect to="/"/> );
    }
  }
}


class OptionItem extends Component {

  constructor() {
    super();
    this.state = {
      options: [],
      myVoting: 1
    }
  }

  componentWillMount() {
    const pushOption = [];
    var flag = 0;
    axios.get(`${config.url.question}/${this.props.list_question._id}/option`)
      .then(res => {
        for (var questionObject of res.data) {
          for (var optionObject of this.props.list_question.options) {
            if (questionObject._id === optionObject._id) {
              pushOption.push(optionObject);
              flag = 0;
              break;
            } else {
              flag = 1;
            }
          }
          if (flag) {
            pushOption.push(questionObject);
          }
        }
        this.setState({
          options: pushOption
        });
      });

  }

  render() {
      var option_item;
      option_item = this.state.options.map(list_option => {
            return (
              <Question  key={list_option._id} list_option={list_option} myVoting={this.state.myVoting} validate={this.props.list_question.option_id} />
            );
        });

      return(
        <div className="OptionItem">
          <form >
            <fieldset disabled>
              <Col xsOffset={1} smOffset={3}>
                <h4><li><strong>{this.props.list_question.question}</strong></li></h4>
                {option_item}
              </Col>
            </fieldset>
          </form>
        </div>
      );
    }
}


export default QuestionItem;
