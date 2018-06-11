import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, FormControl} from 'react-bootstrap';
import { Jumbotron, Grid, Row, Col, Button} from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';
import './Login.css';

class Login extends Component {

  constructor() {
  super();
  this.state = {
      login:-1
    }
  }

  handleSubmit(e) {
        e.preventDefault();

        axios.post(`http://172.24.125.116:8000/api/user/login`, {
          email_id:this.refs.Email.value,
          password:this.refs.Password.value
        })
        .then(res=> {
            localStorage.setItem("user",JSON.stringify(res.data.message));
            localStorage.setItem("admin",JSON.parse(localStorage.getItem("user")).isadmin);
            localStorage.setItem("user_id",JSON.parse(localStorage.getItem("user"))._id);
            localStorage.setItem("email_id",JSON.parse(localStorage.getItem("user")).email_id);
            localStorage.setItem("user_name",JSON.parse(localStorage.getItem("user")).user_name);
            localStorage.setItem("password",JSON.parse(localStorage.getItem("user")).password);
            this.setState({login:localStorage.getItem("admin")});
        })
        .catch(error=> {
        console.log(error.response.data.error)
        });

}

  render() {
    if(localStorage.getItem("admin")==1)
    {
      return(
        <Redirect to="/admin" />
      );
    }
    else if(localStorage.getItem("admin")==0)
    {
      return(
        <Redirect to="/question" />
      );
    }
    return (
      <div className="Login">
      <Jumbotron>
          <Col xsOffset={5} smOffset={5}>
              <h2>Login</h2>
          </Col>
        </Jumbotron>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <Row className="row-space">
          <Col xsOffset={3} xs={5} sm={3} smOffset={4}>
            <input className="form-control" type="text" ref="Email" placeholder="Email_id" />
          </Col>
        </Row>
        <Row className="row-space">
          <Col xsOffset={3} xs={5} sm={3} smOffset={4}>
            <input className="form-control" type="password" ref="Password" placeholder="Password" />
          </Col>
        </Row>
        <Col xsPush={1} xs={1} xsOffset={2}   smOffset={3} >
           <Button type="submit" bsStyle="success">Login</Button>
        </Col>
        <Col xsPush={1} xs={1} xsOffset={2}  smOffset={0}>
            <Button type="reset" bsStyle="danger">Reset</Button>
        </Col>
        </form>
      </div>
    );
  }
}

export default Login;
