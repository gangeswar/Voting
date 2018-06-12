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
        register:false,
        error:null
    }
  }

    handleSubmit(e) {
      e.preventDefault();
      if((this.refs.Email.value==="")||(this.refs.User.value==="")||(this.refs.Password.value==="")){
          this.setState({register:false,error:"Empty field"});
      }
      else {
      axios.post('http://172.24.125.116:8000/api/user', {
        email_id:this.refs.Email.value,
        user_name:this.refs.User.value,
        password:this.refs.Password.value
      })
      .then(res => {
        this.setState({register:true,error:null});
        alert(res.data.message);
      })
      .catch(error => {
        this.setState({register:false});
        alert(error.response.data.error);
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
            <input className="form-control" type="email" ref="Email" placeholder="E-mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}" title="invalid email id" />
          </Col>
        </Row>
        <Row className="row-space">
          <Col xsOffset={3} xs={5} sm={3} smOffset={4}>
            <input className="form-control" type="text" ref="User" placeholder="User-Name" />
          </Col>
        </Row>
        <Row className="row-space">
          <Col xsOffset={3} xs={5} sm={3} smOffset={4}>
            <input className="form-control" type="password" ref="Password" placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"/>
          </Col>
        </Row>
        <Col xsPush={1} xs={1} xsOffset={2}   smOffset={3} >
          <Button type="submit" bsStyle="primary">Register</Button>
        </Col>
        <Col xsPush={1} xs={1} xsOffset={2}   smOffset={0} >
            <Button type="reset" bsStyle="primary">Reset</Button>
        </Col><br/><br/><br/>
        <div id="right" style={{color:"red"}}>{this.state.error}
        </div>
        <div id="right">
          <strong >already have account?<Link to="/"> login</Link></strong>
          </div>
        </form>
      </div>
    );
  }
}
}

export default Register;
