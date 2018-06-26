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
    FormControl
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
      else if (!(validator.isEmail( this.state.email)) && this.state.email.length>0 ) return 'error';
      else{
        return null;
      }
    }


    getUserValidation() {
          if (this.state.userName.length > 5 && this.state.userName.length < 15) return 'success';
          else if (!(this.state.userName.length > 5 && this.state.userName.length < 15) && this.state.email.length>0) return 'error';
          else {
            return null;
          }
    }

    getPasswordValidation() {
      if (validator.isAlphanumeric( this.state.password) && this.state.password.length > 6 && this.state.password.length <15 ) return 'success';
      else if(!(validator.isAlphanumeric( this.state.password) && this.state.password.length > 6 && this.state.password.length <15) && this.state.email.length>0) return 'error';
      else {
        return null;
      }
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
        if (!(validator.isEmail(this.state.email) && ((this.state.userName.length > 5) && (this.state.userName.length < 15) )&& (validator.isAlphanumeric( this.state.password) && (this.state.password.length > 6) && (this.state.password.length <15)))) {
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
                >
                <FormControl
                   type="text"
                   value={this.state.userName}
                   placeholder="User Name"
                   onChange={this.handleUserChange.bind(this)}
                   />
                <FormControl.Feedback />
             </FormGroup>
             </Col>
          </Row>
          <Row className="row-space">
             <Col xsOffset={3} xs={5} sm={3} smOffset={4}>
             <FormGroup
                validationState={this.getPasswordValidation()}
                >
                <FormControl
                   type="password"
                   value={this.state.password}
                   placeholder="Password"
                   onChange={this.handlePasswordChange.bind(this)}
                   />
                <FormControl.Feedback />
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
