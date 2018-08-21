import React from 'react';
import { Container, Row, Input, Button, Card, CardBody } from 'mdbreact';
import { Col } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Signup extends React.Component  {

  constructor() {
    super();
    this.state = {
      userName: '',
      emailId: '',
      password: '',
      conformPassword: '',
      name_error: '',
      email_error: '',
      password_error: '',
      confirmPassword_error: '',
      validation: false,
      resultdata: ''
    }
  }
  
  clearError(event) {
    this.setState({
      name_error: '',
      email_error: '',
      password_error: '',
      confirmPassword_error: ''
    });
  }

  handleEmailChange(e) {
    this.setState({
      emailId: e.target.value
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


  signUp(event) {
    event.preventDefault();
    console.log(event.target.value);
    axios.post(`http://172.24.125.116:8000/api/user/signup`, {
      name: this.state.userName,
      emailId: this.state.emailId,
      password: this.state.password    })
    .then(result => {
      this.setState({
        validation: true,
        errorMessage: ''
      });
    }).catch (err => {
      this.setState ({
        email_error: "Email Exists",
        validation: false
      });
    });
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
                <Input label="Password" icon="lock" group type="password" ref="password"  onChange={this.handlePasswordChange.bind(this)} value={this.state.password} validate/>
                <Input label="Confirm password" icon="exclamation-triangle" group type="password" validate error="wrong" success="right"/>
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