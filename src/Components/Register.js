import React, { Component } from 'react';
import uuid from 'uuid';
import axios from 'axios';
import { FormGroup, FormControl} from 'react-bootstrap';
import { Jumbotron, Grid, Row, Col, Button} from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';
import './Login.css';

class Register extends Component {

    constructor() {
    super();
    this.state = {
        newUser :{},
        submit:false,
        register:false
    }
  }

    handleSubmit(e) {
      e.preventDefault();
      if((this.refs.Email.value==="")||(this.refs.User.value==="")||(this.refs.Password.value==="")){
          this.setState({register:false});
          alert("Empty field");
      }
      else {
      axios.post('http://172.24.125.116:8000/api/user', {
        email_id:this.refs.Email.value,
        user_name:this.refs.User.value,
        password:this.refs.Password.value
      })
      .then(res => {
        this.setState({register:true});
        alert(res.data.message);
      })
      .catch(error => {
        this.setState({register:false});
        alert(error.response.status);
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
          <Col xs={14} xsOffset={6}>
              <h2>Register</h2>
          </Col>
        </Jumbotron>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <Row className="row-space">
          <Col xsPush={1} xs={3} xsOffset={4}>
            <input className="form-control" type="email" ref="Email" placeholder="E-mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}" title="invalid email id" />
          </Col>
        </Row>
        <Row className="row-space">
          <Col xsPush={1} xs={3} xsOffset={4}>
            <input className="form-control" type="text" ref="User" placeholder="User-Name" />
          </Col>
        </Row>
        <Row className="row-space">
          <Col xsPush={1} xs={3} xsOffset={4}>
            <input className="form-control" type="password" ref="Password" placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"/>
          </Col>
        </Row>
        <Col xsPush={1} xs={1} xsOffset={4}>
          <Button type="submit" bsStyle="primary">Register</Button>
        </Col>
        <Col xsPull={1} xs={2} xsOffset={2}>
            <Button type="reset" bsStyle="primary">Reset</Button>
        </Col>
        </form>
      </div>
    );
  }
}
}

export default Register;
