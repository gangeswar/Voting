import React, { Component } from 'react';
import uuid from 'uuid';
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
      if((this.refs.Email.value==="")||(this.refs.User.value==="")||(this.refs.Password.value==="")){
          this.setState({register:false});
          e.preventDefault();
          alert("Empty field");
      }
      else {
      this.setState({register:true});
      this.setState({newUser:{
        user_id  : uuid.v4(),
        email  : this.refs.Email.value,
        user_name  : this.refs.User.value,
        password  : this.refs.Password.value
      }}, function(){
          this.props.registerUser(this.state.newUser);
      }
    );
      this.setState({submit:true});
      e.preventDefault();
      alert("successfully login");
    }
  }
    render() {
      if((this.state.submit) && (this.state.register))
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
            <input className="form-control" type="email" ref="Email" placeholder="E-mail" />
          </Col>
        </Row>
        <Row className="row-space">
          <Col xsPush={1} xs={3} xsOffset={4}>
            <input className="form-control" type="text" ref="User" placeholder="User-Name" />
          </Col>
        </Row>
        <Row className="row-space">
          <Col xsPush={1} xs={3} xsOffset={4}>
            <input className="form-control" type="password" ref="Password" placeholder="Password" />
          </Col>
        </Row>
        <Col xsPush={1} xs={1} xsOffset={4}>
          <Button type="submit" bsStyle="success">Register</Button>
        </Col>
        <Col xsPull={1} xs={2} xsOffset={2}>
            <Button type="reset" bsStyle="danger">Reset</Button>
        </Col>
        </form>
      </div>
    );
  }
}
}

export default Register;
