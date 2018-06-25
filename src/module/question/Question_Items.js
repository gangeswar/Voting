import React, {
    Component
} from 'react';
import {
    Jumbotron,
    Col,
    Button
} from 'react-bootstrap';
import axios from 'axios';
import Home from './Home'
import Question from './Question'
import './Question.css';


class QuestionItem extends Component {

    constructor() {
        super();
        this.state = {
            questions: []
        }
    }

    submitQuestion(id) {
        const questions=this.state.questions;
        const index=questions.findIndex(x => x._id===id);
        questions.splice(index, 1);
        this.setState({
            questions: questions
        });
    }

    componentWillMount() {
        axios.get(`http://172.24.125.116:8000/api/question/user/${localStorage.getItem("user_id")}/availablequestion`)
            .then(res => this.setState({
                questions: res.data
            }));
    }


  render() {
    var question_item;
    question_item=this.state.questions.map(list_question => {
        return(
          <OptionItem   key={list_question._id} onDelete={this.submitQuestion.bind(this)}  list_question={list_question} />
        );
    });

    if(localStorage.getItem("admin")==="1")
    {
        return(<Home/> );
    }
    else{
        return(
            <div className="QuestionItem">
                <Jumbotron>
                    <Col  xsOffset={5}>
                        <h2>Questions</h2>
                    </Col>
                </Jumbotron>
                <ol>
                {question_item}
                </ol>
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

    this.setState({options:this.props.list_question.options});
  }

  submitQuestion(id){
     this.props.onDelete(id);
     axios.post(`http://172.24.125.116:8000/api/question/myquestion`, {
       user_id : localStorage.getItem("user_id"),
       question_id : this.props.list_question._id,
       option_id : this.state.radio
     }).then(res=>{
         this.setState({radio_arr:res.data.option_id});
     })
 }


  radioSubmit(selectradio) {
    this.setState({radio:selectradio});
  }

  render() {
    var option_item;
    option_item=this.state.options.map(list_option => {
        return(
            <Question key={list_option._id} clickRadio={this.radioSubmit.bind(this)} list_option={list_option} questionItem={this.state.questionItem} radio_arr={this.state.radio_arr} />
        );
    });

        return(
            <div className="OptionItem">
                <form>
                    <Col  xsOffset={3}>
                        <li><strong> {this.props.list_question.question} {this.props.list_question.start_date} - {this.props.list_question.end_date}</strong></li><br />
                            {option_item}
                        <Button  onClick={this.submitQuestion.bind(this,this.props.list_question._id)} bsStyle="success">Submit</Button>
                    </Col>
                </form>
            </div>
        );
  }
}


export default QuestionItem;
