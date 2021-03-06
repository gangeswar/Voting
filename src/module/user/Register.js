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
import config from '../../../config.json';


class Register extends Component {

  constructor() {
    super();
    this.state = {
      submit: false,
      email: "",
      userName: localStorage.getItem("user_id")!==null?localStorage.getItem("user_name"):"",
      password: "",
      error:null
    }
  }

  componentDidMount(){
    if(localStorage.getItem("user_id")!==null) {
      this.props.history.push(`/user_profile/${localStorage.getItem("user_id")}`);
    } else {
      this.props.history.push(`/register`);
    }
  }

  getEmailValidation() {
    if (validator.isEmail(this.state.email)) return 'success';
    else if (!(validator.isEmail(this.state.email)) && this.state.email.length > 0) return 'error';
    return null;
  }


  getUserValidation() {
    if (validator.isAlpha(this.state.userName) && (this.state.userName.length > 3 && this.state.userName.length < 15)) return 'success';
    else if (!(validator.isAlpha(this.state.userName) && (this.state.userName.length > 3 && this.state.userName.length < 15))&& this.state.userName.length > 0) return 'error';
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
      email: "", userName: localStorage.getItem("user_id")!==null?localStorage.getItem("user_name"):"",   password: "" , error:null
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(localStorage.getItem("user_id")!==null) {
      if (!(validator.isEmail(localStorage.getItem("email_id")) && ((this.state.userName.length > 3) && (this.state.userName.length < 15)) && (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}/.test(this.state.password)))) {
        this.setState({
          submit: false
        });
      } else {
          axios.put(`http://172.24.125.116:8000/api/user/${localStorage.getItem("user_id")}`, {
            user_name: this.state.userName,
            oldPassword: this.refs.oldPassword.value,
            password: this.state.password
          }).then(res => {
            this.setState({
              submit: true
            })
          }).catch(error => {
            this.setState({
              error: error.response.data.error
            });
            this.setState({
              submit: false
            })
          });
        }
    } else {
      if (!(validator.isEmail(this.state.email) && (validator.isAlpha(this.state.userName) && (this.state.userName.length > 3 && this.state.userName.length < 15)) && (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}/.test(this.state.password)))) {
        this.setState({
          submit: false
        });
      } else {
        axios.post('http://172.24.125.116:8000/api/user', {
            email_id: this.state.email,
            user_name: this.state.userName,
            password: this.state.password
          })
          .then(res => {
            this.setState({
              submit: true,
              error: null
            });
          })
          .catch(error => {
            this.setState({
              submit: false
            });
            this.setState({
              error: error.response.data.error
            })
          });
      }
    }
}

  render() {
      if (this.state.submit) {
        return (
          <Redirect to="/" />
        );
      } else {
        if(localStorage.getItem("user_id")!=null) {
          return(
          <div className="UserProfile">
            <Jumbotron>
                <Col xsOffset={4} smOffset={4}>
                <h1>Profile Update</h1>
                </Col>
            </Jumbotron>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <Row className="row-space">
                <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                  <FormGroup
                     validationState={this.getEmailValidation()}
                      controlId="formValidation1">
                     <FormControl
                        type="email"
                        value={localStorage.getItem("email_id")}
                        placeholder="Email"
                        onChange={this.handleEmailChange.bind(this)} disabled/>
                       <FormControl.Feedback />
                   </FormGroup>
                </Col>
              </Row>
              <Row className="row-space">
                 <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                 <FormGroup
                    validationState={this.getUserValidation()}
                     controlId="formValidation2">
                    <FormControl
                       type="text"
                       defaultValue={localStorage.getItem("user_name")}
                       placeholder="User Name"
                       onChange={this.handleUserChange.bind(this)} required/>
                      <FormControl.Feedback />
                    <HelpBlock> Username should between 3 to 15 character.</HelpBlock>
                 </FormGroup>
                 </Col>
              </Row>
              <Row className="row-space">
                <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                  <input className="form-control" type="password" ref="oldPassword" placeholder="currentPassword" />
                </Col>
              </Row>
              <Row className="row-space">
                 <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                 <FormGroup
                    validationState={this.getPasswordValidation()}
                     controlId="formValidation3">
                    <FormControl
                       type="password"
                       defaultValue={this.state.password}
                       placeholder="Password"
                       onChange={this.handlePasswordChange.bind(this)} required/>
                      <FormControl.Feedback />
                    <HelpBlock>Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.</HelpBlock>
                  </FormGroup>
                 </Col>
              </Row>
              <Col xs={1} xsOffset={2} smOffset={4}>
                <Button type="submit" bsStyle="primary">Update</Button>
              </Col>
              <Col xs={1} xsOffset={2} smOffset={0}>
                <Button type="reset" onClick={this.reset.bind(this)} bsStyle="primary">Reset</Button>
              </Col>
              <Col xs={1} xsOffset={2} smOffset={0}>
                <Link to="/"><Button >Back</Button></Link>
              </Col>
              {
              this.state.error!=null?
              <Col className="space" sm={4} smOffset={4}>
                <Alert bsStyle="danger">
                  <Col xsOffset={2} smOffset={2}>
                   <strong>{this.state.error}</strong>
                  </Col>
                </Alert>
              </Col>
               :null
              }
              </form>
              </div>
            );
        } else{
        return (
          <div className="Register">
           <Jumbotron>
              <Col  xsOffset={4} smOffset={5}>
              <h1>Sign Up</h1>
              </Col>
           </Jumbotron>
           <Row>
           <form onSubmit={this.handleSubmit.bind(this)}>
              <Row className="row-space">
                 <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
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
                 <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                 <FormGroup
                    validationState={this.getUserValidation()}
                     controlId="formValidation2">
                    <FormControl
                       type="text"
                       value={this.state.userName}
                       placeholder="User Name"
                       onChange={this.handleUserChange.bind(this)} required/>
                      <FormControl.Feedback />
                    <HelpBlock> Username should be between 3 to 15 character.</HelpBlock>
                 </FormGroup>
                 </Col>
              </Row>
              <Row className="row-space">
                 <Col  xs={8} xsOffset={2} sm={4} smOffset={4}>
                 <FormGroup
                    validationState={this.getPasswordValidation()}
                     controlId="formValidation3">
                    <FormControl
                       type="password"
                       value={this.state.password}
                       placeholder="Password"
                       onChange={this.handlePasswordChange.bind(this)} required/>
                      <FormControl.Feedback />
                    <HelpBlock>Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters.</HelpBlock>
                  </FormGroup>
                 </Col>
              </Row>
              <Col xsPush={1} xs={1} xsOffset={2}   smOffset={3} >
                <Button type="submit" bsStyle="primary">Register</Button>
              </Col>
              <Col xsPush={1} xs={1} xsOffset={2}   smOffset={0} >
                <Button type="reset" onClick={this.reset.bind(this)} bsStyle="primary">Reset</Button>
              </Col>
               </form>
              </Row>
              <div className="space">
                <Col xsOffset={3} smOffset={4} >
                  <strong >
                    {config.data.signup}
                    <Link to="/"> Login</Link>
                  </strong>
                </Col>
              </div>
              {
              this.state.error!=null?
                <Col className="space" sm={4} smOffset={4}>
                  <Alert bsStyle="danger">
                    <Col xsOffset={4} smOffset={4} >
                      <strong >{this.state.error}</strong>
                    </Col>
                  </Alert>
                </Col>
               :null
              }
        </div>
        );
      }
    }
  }
}


export default Register;
