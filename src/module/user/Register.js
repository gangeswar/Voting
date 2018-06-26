import React, {
    Component
} from 'react';
import axios from 'axios';
import {
    Jumbotron,
    Row,
    Col,
    Button,
    FormGroup,
    FormControl,
    HelpBlock
} from 'react-bootstrap';
import {
    Link,
    Redirect
} from 'react-router-dom';
import validator from 'validator';
import './Login.css';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            register: false,
            email:"",
            userName:"",
            password:""
        }
    }

    getEmailValidation() {
      if (validator.isEmail( this.state.email)) return 'success';
      else if (!(validator.isEmail( this.state.email)) && this.state.email.length>1 ) return 'error';
      return null;
    }


    getUserValidation() {
      if (this.state.userName.length > 5 && this.state.userName.length < 15) return 'success';
      else if (!(this.state.userName.length > 5 && this.state.userName.length < 15) && this.state.email.length>1) return 'error';
      return null;
    }

    getPasswordValidation() {
      if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(this.state.password) ) return 'success';
      else if(!(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(this.state.password))&& this.state.email.length>1) return 'error';
      return null;
    }

    handleEmailChange(e) {
      this.setState({ email: e.target.value });
    }

    handleUserChange(e) {
        this.setState({ userName: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!(validator.isEmail(this.state.email) && ((this.state.userName.length > 5) && (this.state.userName.length < 15) )&& (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}/.test(this.state.password)))) {
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
                        Conflict_error: error.response.data.error
                    })
                });
        }
    }

    render() {
    if(this.state.register)
    {
      return(
        <Redirect to="/" />
      );
    }
    else {
    return (
      <div className="Register">
       <Jumbotron>
          <Col  xsOffset={5} smOffset={5}>
          <h2>Register</h2>
          </Col>
       </Jumbotron>
       <form onSubmit={this.handleSubmit.bind(this)}>
          <Row className="row-space">
             <Col xsOffset={3} xs={5} sm={3} smOffset={4}>
             <FormGroup
                validationState={this.getEmailValidation()}
                 controlId="formValidation1"
                >
                <FormControl
                   type="email"
                   value={this.state.email}
                   placeholder="Email Id"
                   onChange={this.handleEmailChange.bind(this)}
                   />
                  <FormControl.Feedback />
                </FormGroup>
             </Col>
          </Row>
          <Row className="row-space">
             <Col xsOffset={3} xs={5} sm={3} smOffset={4}>
             <FormGroup
                validationState={this.getUserValidation()}
                 controlId="formValidation2"
                >
                <FormControl
                   type="text"
                   value={this.state.userName}
                   placeholder="User Name"
                   onChange={this.handleUserChange.bind(this)}
                   />
                <FormControl.Feedback />
                <HelpBlock>password should between 5 to 15 character.</HelpBlock>
             </FormGroup>
             </Col>
          </Row>
          <Row className="row-space">
             <Col xsOffset={3} xs={5} sm={3} smOffset={4}>
             <FormGroup
                validationState={this.getPasswordValidation()}
                 controlId="formValidation3"
                >
                <FormControl
                   type="password"
                   value={this.state.password}
                   placeholder="Password"
                   onChange={this.handlePasswordChange.bind(this)}
                   />
                <FormControl.Feedback />
                <HelpBlock>password should have atleast 1 capital 1 small letter 1 number and length more than 6 character.</HelpBlock>
             </FormGroup>
             </Col>
          </Row>
          <Col xsPush={1} xs={1} xsOffset={2}   smOffset={3} >
          <Button type="submit" bsStyle="primary">Register</Button>
          </Col>
          <Col xsPush={1} xs={1} xsOffset={2}   smOffset={0} >
          <Button type="reset" bsStyle="primary">Reset</Button>
          </Col><br/><br/>
          <span id="right" style={{color:"red"}}>{this.state.Conflict_error}
          </span>
          <div id="right">
             <strong >
                already have account?
                <Link to="/">
                login</Link>
             </strong>
          </div>
       </form>
    </div>
    );
  }
}
}

export default Register;
