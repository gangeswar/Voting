import React, {
  Component
}
from 'react';
import axios from 'axios';
import {
  Jumbotron,
  Row,
  Col,
  Button,
  Alert
}
from 'react-bootstrap';
import {
  Link,
  Redirect
}
from 'react-router-dom';
import './Login.css';

class UserProfile extends Component {

  constructor() {
    super();
    this.state = {
      update: false,
      error: null
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(localStorage.getItem("user_id"));
    axios.put(`http://172.24.125.116:8000/api/user/${localStorage.getItem("user_id")}`, {
      email_id: this.refs.Email.value,
      user_name: this.refs.User.value,
      oldPassword: this.refs.oldPassword.value,
      password: this.refs.newPassword.value
    }).then(res => {
      this.setState({
        update: true
      })
    }).catch(error => {
      this.setState({
        error: error.response.data.error
      });
      this.setState({
        update: false
      })
    });
  }

  render() {
    if (localStorage.getItem("user_id") != null) {
      if (this.state.update) {
        return (
          <Redirect to="/"/>
        );
    }
    return (
      <div className="UserProfile">
        <Jumbotron>
            <Col xsOffset={5}>
            <h2>Profile Update</h2>
            </Col>
        </Jumbotron>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Row className="row-space">
            <Col xsOffset={3} xs={5} sm={3} smOffset={4}>
              <input className="form-control" type="email" ref="Email" placeholder="E-mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}" title="invalid email id" value={localStorage.getItem("email_id")} disabled/>
            </Col>
          </Row>
          <Row className="row-space">
            <Col xsOffset={3} xs={5} sm={3} smOffset={4}>
              <input className="form-control" type="text" ref="User" placeholder="User-Name" defaultValue={localStorage.getItem("user_name")}/>
            </Col>
          </Row>
          <Row className="row-space">
            <Col xsOffset={3} xs={5} sm={3} smOffset={4}>
              <input className="form-control" type="password" ref="oldPassword" placeholder="currentPassword" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" />
            </Col>
          </Row>
          <Row className="row-space">
            <Col xsOffset={3} xs={5} sm={3} smOffset={4}>
              <input className="form-control" type="password" ref="newPassword" placeholder="newPassword" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" />
            </Col>
          </Row>
          <Col xsPush={1} xs={1} xsOffset={2}   smOffset={3}>
            <Button type="submit" bsStyle="primary">Update</Button>
          </Col>
          <Col xsPush={1} xs={1} xsOffset={2}   smOffset={0}>
            <Button type="reset" bsStyle="primary">Reset</Button>
          </Col>
          <Col xsPush={1} xs={1} xsOffset={2}  smOffset={0}>
            <Link to="/"><Button bsStyle="basic" >Back</Button></Link>
          </Col><br/><br/><br/>
          {
          this.state.error!=null?
            <Alert bsStyle="danger">
               <strong className="right">{this.state.error}</strong>
            </Alert>
           :null
          }
        </form>
      </div>
    );
  } else {
      return(<Redirect to="/"/> );
    }
  }
}


export default UserProfile;
