import React, { Component } from 'react';
import { FormGroup, FormControl} from 'react-bootstrap';
import { Jumbotron, Grid, Row, Col, Button} from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';
import './Login.css';

class Login extends Component {

  constructor() {
  super();
  this.state = {
      login:false,
      admin:false
    }
  }

  handleSubmit(e) {
    let admin="admin"
    let password="123"

    if(admin===this.refs.User.value){
      if(password===this.refs.Password.value)
      {
        this.setState({admin:true});
        console.log("asas");
      }
    }
    else{
      this.setState({admin:false});
    for(var i of this.props.users)
    {
      if(i.user_name===this.refs.User.value)
      {
        if(i.password==this.refs.Password.value)
        {
          this.setState({login:true});
        }
      }
      else{
        this.setState({login:false});
        alert("not a valid user");
      }
    }
  }
  e.preventDefault();
}

  render() {
    if( this.state.login)
    {
      return(
        <Redirect to="/question" />
      );
    }
    else if(this.state.admin)
    {
      return(
        <Redirect to="/admin" />
      );
    }
    else {
    return (
      <div className="Login">
      <Jumbotron>
          <Col xs={14} xsOffset={6}>
              <h2>Login</h2>
          </Col>
        </Jumbotron>
        <form onSubmit={this.handleSubmit.bind(this)}>
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
            <Button type="submit" bsStyle="success">Login</Button>
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

export default Login;
