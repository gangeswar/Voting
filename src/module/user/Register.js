import React, {
  Component
}
from 'react';
import axios from 'axios';
import {
  Jumbotron,
  Row,
  Col,
  Button,
  FormGroup,
  FormControl,
  HelpBlock,
  Alert
}
from 'react-bootstrap';
import {
  Link,
  Redirect
}
from 'react-router-dom';
import validator from 'validator';
import './Login.css';

class Register extends Component {

  constructor() {
    super();
    this.state = {
      register: false,
      email: "",
      userName: "",
      password: "",
      error:null
    }
  }

  getEmailValidation() {
    if (validator.isEmail(this.state.email)) return 'success';
    else if (!(validator.isEmail(this.state.email)) && this.state.email.length > 0) return 'error';
    return null;
  }


  getUserValidation() {
    if (this.state.userName.length > 3 && this.state.userName.length < 15) return 'success';
    else if (!(this.state.userName.length > 3 && this.state.userName.length < 15)&& this.state.userName.length > 0) return 'error';
    return null;
  }

  getPasswordValidation() {
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(this.state.password)) return 'success';
    else if (!(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(this.state.password))&& this.state.password.length > 0) return 'error';
    return null;
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  handleUserChange(e) {
    this.setState({
      userName: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  reset() {
    this.setState({
      email: "", userName: "",   password: "" , error:null
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!(validator.isEmail(this.state.email) && ((this.state.userName.length > 3) && (this.state.userName.length < 15)) && (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}/.test(this.state.password)))) {
      this.setState({
        register: false
      });
    } else {
      axios.post('http://172.24.125.116:8000/api/user', {
          email_id: this.state.email,
          user_name: this.state.userName,
          password: this.state.password
        })
        .then(res => {
          this.setState({
            register: true,
            error: null
          });
        })
        .catch(error => {
          this.setState({
            register: false
          });
          this.setState({
            error: error.response.data.error
          })
        });
    }
  }

  render() {
      if (this.state.register) {
        return (
          <Redirect to="/" />
        );
      }
      else {
        return (
          <div className="Register">
           <Jumbotron>
              <Col  xsOffset={5} smOffset={5}>
              <h2>Sign Up</h2>
              </Col>
           </Jumbotron>
           <form onSubmit={this.handleSubmit.bind(this)}>
              <Row className="row-space">
                 <Col xsOffset={3} xs={5} sm={3} smOffset={4}>
                 <FormGroup
                    validationState={this.getEmailValidation()}
                     controlId="formValidation1">
                    <FormControl
                       type="email"
                       value={this.state.email}
                       placeholder="Email"
                       onChange={this.handleEmailChange.bind(this)} required/>
                      <FormControl.Feedback />
                    </FormGroup>
                 </Col>
              </Row>
              <Row className="row-space">
                 <Col xsOffset={3} xs={5} sm={3} smOffset={4}>
                 <FormGroup
                    validationState={this.getUserValidation()}
                     controlId="formValidation2">
                    <FormControl
                       type="text"
                       value={this.state.userName}
                       placeholder="User Name"
                       onChange={this.handleUserChange.bind(this)} required/>
                      <FormControl.Feedback />
                    <HelpBlock> Username should between 3 to 15 character.</HelpBlock>
                 </FormGroup>
                 </Col>
              </Row>
              <Row className="row-space">
                 <Col xsOffset={3} xs={5} sm={3} smOffset={4}>
                 <FormGroup
                    validationState={this.getPasswordValidation()}
                     controlId="formValidation3">
                    <FormControl
                       type="password"
                       value={this.state.password}
                       placeholder="Password"
                       onChange={this.handlePasswordChange.bind(this)} required/>
                      <FormControl.Feedback />
                    <HelpBlock>Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.</HelpBlock>
                  </FormGroup>
                 </Col>
              </Row>
              <Col xsPush={1} xs={1} xsOffset={2}   smOffset={3} >
                <Button type="submit" bsStyle="primary">Register</Button>
              </Col>
              <Col xsPush={1} xs={1} xsOffset={2}   smOffset={0} >
                <Button type="reset" onClick={this.reset.bind(this)} bsStyle="primary">Reset</Button>
              </Col><br/><br/>
              {
              this.state.error!=null?
                <Alert bsStyle="danger">
                   <strong className="right">{this.state.error}</strong>
                </Alert>
               :null
              }
              <div className="right">
                 <strong >
                    already have account?
                    <Link to="/"> login</Link>
                 </strong>
              </div>
           </form>
        </div>
        );
      }
    }
}


export default Register;
