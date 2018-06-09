import React, { Component } from 'react';
import uuid from 'uuid';
import axios from 'axios';
import { FormGroup, FormControl} from 'react-bootstrap';
import { Jumbotron, Grid, Row, Col, Button} from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';
import './Login.css';

class UserProfile extends Component {

    constructor() {
    super();
    this.state = {
        newUser :{},
        update:false
    }
    axios.get(`http://172.24.125.116:8000/api/user/${localStorage.getItem("user_id")}`).then(res=>
    localStorage.setItem("user_profile",JSON.stringify(res.data)));
  }

  handleSubmit(e){
        e.preventDefault();
      
        if(this.refs.oldPassword.value==localStorage.getItem("password"))
        {
        axios.put(`http://172.24.125.116:8000/api/user/${localStorage.getItem("user_id")}`,{
          email_id:this.refs.Email.value,
          user_name:this.refs.User.value,
          password:this.refs.newPassword.value
        }).then(res=> {this.setState({update:true})}).catch(error => {this.setState({update:false})});
        }
        else
        {
          alert("password cannot match");
        }
  }

  render() {
    var email_id = localStorage.getItem("email_id");
    var user_name = localStorage.getItem("user_name");

    if(this.state.update)
    {
      alert("hai");
      return(
          <Redirect to="/"/>
      );
    }
    else{
      alert("hello")
      return (
        <div className="UserProfile">
        <Jumbotron>
            <Col xs={14} xsOffset={6}>
                <h2>Profile Update</h2>
            </Col>
          </Jumbotron>
          <form onSubmit={this.handleSubmit.bind(this)}>
          <Row className="row-space">
            <Col xsPush={1} xs={3} xsOffset={4}>
              <input className="form-control" type="email" ref="Email" placeholder="E-mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}" title="invalid email id" value={email_id}/>
            </Col>
          </Row>
          <Row className="row-space">
            <Col xsPush={1} xs={3} xsOffset={4}>
              <input className="form-control" type="text" ref="User" placeholder="User-Name" value={user_name}/>
            </Col>
          </Row>
          <Row className="row-space">
            <Col xsPush={1} xs={3} xsOffset={4}>
              <input className="form-control" type="password" ref="oldPassword" placeholder="currentPassword" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" />
            </Col>
          </Row>
          <Row className="row-space">
            <Col xsPush={1} xs={3} xsOffset={4}>
              <input className="form-control" type="password" ref="newPassword" placeholder="newPassword" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" />
            </Col>
          </Row>
          <Col xsPush={1} xs={1} xsOffset={4}>
            <Button type="submit" bsStyle="primary">Update</Button>
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
export default UserProfile;
