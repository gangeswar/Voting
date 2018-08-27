import React from 'react';
import { Container, Row, Input, Button, Card, CardBody } from 'mdbreact';
import { Col, Alert } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';

import config from '../../config.json';

class Signup extends React.Component  {

  constructor() {
    super();
    this.state = {
      userName: '',
      emailId: '',
      password: '',
      validation: false,
      email_error:'',
      password_error:'',
      confirmPassword_error:''
    }
  }
  
  handleEmailChange(event) {
    this.setState({
      emailId: event.target.value
    });
  }

  handleUserChange(event) {
    this.setState({
      userName: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }


  signUp(event) {
    event.preventDefault();
    const error =[];
    if(!(validator.isEmail(this.state.emailId))) {
      this.setState({
        email_error: 'Enter a valid Email'
      });
      error.push(0);
    } else {
      this.setState({
        email_error: ''
      });
      error.push(1);
    }
    if(!(validator.isAlphanumeric(this.state.password))) {
      this.setState({
        password_error: 'No special characters allowed'
      });
      error.push(0);
    } else {
      this.setState({
        password_error: ''
      });
      error.push(1);
    }
    // if(!(this.state.password == this.state.Confirmpassword)) {
    //   this.setState({
    //     confirmPassword_error: 'Password should be same'
    //   });
    //   error.push(0);
    // } else {
    //   this.setState({
    //     confirmPassword_error: ''
    //   });
    //   error.push(1);
    // }

    if(!error.includes(0)) {
      axios.post(config.url.signup, {
        userName: this.state.userName,
        emailId: this.state.emailId,
        password: this.state.password    
      }).then(result => {
        console.log(result)
        this.setState({
          validation: true
        });
      }).catch (err => {
        this.setState ({
          validation: false
        });
      });
    }
  }

  render() {
    if(this.state.validation === true) {
      return(
        <Redirect exact to="/signup/phone"></Redirect>
      );
    }
    return(
      <Container>
        <section className="form-simple">
        <form onSubmit={this.signUp.bind(this)}>
          <Row>
            <Col md={{size:'6', offset:'3'}}>
              <Card>
                <div className="header pt-3 grey lighten-2">
                  <Row className="d-flex justify-content-start">
                    <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">Sign Up</h3>
                  </Row>
                </div>
                <CardBody className="mx-4 mt-4">
                <Input label="Name" icon="user" group type="text" ref="name" validate error="wrong"  onChange={this.handleUserChange.bind(this)} value={this.state.name} success="right"/>
                <Input label="Email" icon="envelope" group type="email" ref="emailId" validate error="wrong"  onChange={this.handleEmailChange.bind(this)} value={this.state.emailId} success="right"/>
                {this.state.email_error=== ''?null :<Alert color="danger"> {this.state.email_error}
                </Alert>}
                <Input label="Password" icon="lock" group type="password" ref="password"  onChange={this.handlePasswordChange.bind(this)} value={this.state.password} validate/>
                {this.state.password_error=== ''?null :<Alert color="danger"> {this.state.password_error}
                </Alert>}
                <Input label="Confirm password" icon="exclamation-triangle" group type="password" validate error="wrong" success="right"/>
                {this.state.confirmPassword_error=== ''?null :<Alert color="danger"> {this.state.confirmPassword_error}
                </Alert>}
                <div className="text-center mb-4 mt-5">
                <Button color="primary" type="submit" className="btn-block z-depth-2">Sign Up</Button>
                </div>
                <p className="font-small grey-text d-flex justify-content-center">Have an Account? <a href="/" className="dark-grey-text font-weight-bold ml-1"> Sign In</a></p>
                </CardBody>
              </Card>
            </Col>
          </Row>
          </form>
        </section>
      </Container>
    );
  }
};

export default Signup;