import React, {
    Component
} from 'react';
import {
    Jumbotron,
    Col
} from 'react-bootstrap';
import {
    Redirect
} from 'react-router-dom';
import axios from 'axios';
import Question from './Question'
import './Question.css';


class QuestionItem extends Component {

    constructor() {
        super();
        this.state = {
            questions: []
        }
    }

    componentWillMount() {
      const json_value=[];
        axios.get(`http://172.24.125.116:8000/api/question/user/${localStorage.getItem("user_id")}/myquestion`)
            .then(res => {res.data.map(ans=>{
                return json_value.push(ans)
            })
            this.setState({questions:json_value})
          });
    }

  render() {
    if(localStorage.getItem("user_id")!=null && localStorage.getItem("admin")==="0")
    {
        var questionItem;
        questionItem=this.state.questions.map(list_question => {
        return(
            <OptionItem   key={list_question.questions._id}  list_question={list_question.questions} />
        );
      });
      return(
        <div className="QuestionItem">
            <Jumbotron>
                <Col  xsOffset={5}>
                    <h2>My Voting</h2>
                </Col>
            </Jumbotron>
            <ol>
            {questionItem}
            </ol>
        </div>
      );
  }
  else {
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
      const push_option=[];
      var flag=0;
      axios.get(`http://172.24.125.116:8000/api/question/${this.props.list_question._id}/option`)
      .then(res=>{
        for(var i of res.data)
        {
            for(var j of this.props.list_question.options)
            {
                if(i._id===j._id)
                {
                   push_option.push(j);
                   flag=0;
                   break;
                }
                else {
                  flag=1;
                }
            }
            if(flag)
            {
             push_option.push(i);
            }
        }
        this.setState({
             options: push_option
         });
      });

    }

    render() {
        var option_item;
        option_item = this.state.options.map(list_option => {
            return(
              <Question  key={list_option._id} list_option={list_option} myVoting={this.state.myVoting} validate={this.props.list_question.option_id} />
            );
        });

        return(
          <div className="OptionItem">
            <form >
            <Col  xsOffset={3}>
                <li><strong>{this.props.list_question.question} {this.props.list_question.start_date} - {this.props.list_question.end_date}</strong></li><br />
                {option_item}
            </Col>
            </form>
          </div>
        );
      }
}

export default QuestionItem;