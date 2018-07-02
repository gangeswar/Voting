import React, {
  Component
}
from 'react';
import {
  Radio,
  Badge
}
from 'react-bootstrap';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Question.css';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      radioValue: null
    }
  }
  click(event) {
    this.setState({
      radioValue: event.target.value
    }, function() {
      this.props.clickRadio(this.state.radioValue);
    });
  }
  render() {
      if (this.props.questionItem === 0) {
        return (
          <div className="Question">
            <Radio name={this.props.list_option.question_id} value={this.props.list_option._id} onChange={this.click.bind(this)}>{this.props.list_option.option}</Radio>
          </div>
        );
        } else if(this.props.myVoting===1) {
            if(this.props.validate===this.props.list_option._id) {
              return (
                <div className="Question">
                  <Radio name={this.props.list_option.question_id} value={this.props.list_option._id} checked>{this.props.list_option.option}<Badge>{this.props.list_option.count} </Badge></Radio>
                  <CircularProgressbar className='CircularProgressbar' percentage={this.props.list_option.percentage} text={`${Math.round(this.props.list_option.percentage)}%`} />
                </div>
              );
            } else if (this.props.validate!==this.props.list_option._id) {
                return (
                  <div className="Question">
                    <Radio name={this.props.list_option.question_id} value={this.props.list_option._id} >{this.props.list_option.option}<Badge>{this.props.list_option.count}</Badge></Radio>
                    <CircularProgressbar className='CircularProgressbar' percentage={this.props.list_option.percentage===undefined?0:this.props.list_option.percentage} text={`${this.props.list_option.percentage===undefined?0:Math.round(this.props.list_option.percentage)}%`} />
                  </div>
                );
              }
          }
      }
    }


export default Question;
