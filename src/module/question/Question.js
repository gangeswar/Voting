import React, {
  Component
}
from 'react';
import {
  Radio,
  Badge,
  ProgressBar,
  Col
}
from 'react-bootstrap';
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
            <Radio name={this.props.list_option.question_id} value={this.props.list_option._id} onClick={this.click.bind(this)}>{this.props.list_option.option}</Radio>
          </div>
        );
        } else if(this.props.myVoting===1) {
            if(this.props.validate===this.props.list_option._id) {
              return (
                <div className="Question" >
                  <Col sm={8}>
                    <Radio name={this.props.list_option.question_id} value={this.props.list_option._id} defaultChecked>{this.props.list_option.option}</Radio><Badge className="pull-right"> {this.props.list_option.count} votes</Badge>
                    <ProgressBar now={this.props.list_option.percentage} label={`${Math.ceil(this.props.list_option.percentage).toFixed(1)}%`} />
                  </Col>
                </div>
              );
            } else if (this.props.validate!==this.props.list_option._id) {
                return (
                  <div className="Question">
                    <Col sm={8}>
                      <Radio name={this.props.list_option.question_id} value={this.props.list_option._id} >{this.props.list_option.option}</Radio><Badge className="pull-right"> {this.props.list_option.count===undefined?0:this.props.list_option.count} votes</Badge>
                      <ProgressBar now={this.props.list_option.percentage===undefined?0:this.props.list_option.percentage} label={`${this.props.list_option.percentage===undefined?0:this.props.list_option.percentage.toFixed(1)}%`} />
                    </Col>
                  </div>
                );
              }
          }
      }
    }


export default Question;
