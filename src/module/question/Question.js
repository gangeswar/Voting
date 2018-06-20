import React, {
    Component
} from 'react';
import {
    Radio
} from 'react-bootstrap';

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
        if(this.props.questionItem===0) {
            return (
              <div className="Question">
                  <Radio name={this.props.list_option.question_id} value={this.props.list_option._id} onChange={this.click.bind(this)}>{this.props.list_option.option}</Radio>
              </div>
            );
        } else if(this.props.myVoting===1) {
              if(this.props.validate.includes(this.props.list_option._id))
              {
                return (
                    <div className="Question">
                      <Radio name={this.props.list_option.question_id} value={this.props.list_option._id} disabled="false" checked>{this.props.list_option.option}</Radio>
                  </div>
                );
              } else {
                  return (
                      <div className="Question">
                        <Radio name={this.props.list_option.question_id} value={this.props.list_option._id} disabled="false">{this.props.list_option.option}</Radio>
                    </div>
                  );
              }
          }
    }
}

export default Question;
