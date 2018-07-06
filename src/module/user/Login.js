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

class Login extends Component {

  constructor() {
    super();
    this.state = {
      loginUser: [],
      error: null,
      login: -1
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post(`http://172.24.125.116:8000/api/user/login`, {
        email_id: this.refs.Email.value,
        password: this.refs.Password.value
      })
      .then(res => {
        axios.get(`http://172.24.125.116:8000/api/user/${res.data.message}`).then(res => {
          this.setState({
            loginUser: res.data.message
          });
          localStorage.setItem("admin", this.state.loginUser.isadmin);
          localStorage.setItem("user_id", this.state.loginUser._id);
          localStorage.setItem("email_id", this.state.loginUser.email_id);
          localStorage.setItem("user_name", this.state.loginUser.user_name);
          this.setState({
            login: localStorage.getItem("admin"),
            error: null
          });

        })
      })
      .catch(error => {
        this.setState({
          error: error.response.data.error
        });
      });
  }

  reset() {
    this.setState({error: null});
  }

  render() {
      if (localStorage.getItem("admin")==="1") {
        return ( <Redirect to="/report" /> );
      } else if (localStorage.getItem("admin")==="0") {
        return ( <Redirect to="/question" /> );
      }
      return (
        <div className="Login">
          <Jumbotron>
            <Col xsOffset={4} smOffset={5}>
              <h1>Sign In</h1>
            </Col>
          </Jumbotron>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <Row className="row-space">
              <Col xsOffset={4} xs={5} sm={3} smOffset={4}>
                <input className="form-control" type="text" ref="Email" placeholder="Email" />
              </Col>
            </Row>
            <Row className="row-space">
              <Col xsOffset={4} xs={5} sm={3} smOffset={4}>
                <input className="form-control" type="password" ref="Password" placeholder="Password" />
              </Col>
            </Row>
              <Col xsPush={1} xs={1} xsOffset={2} smPush={0}  smOffset={4}  sm={1}>
                <Button type="submit" bsStyle="primary">Login</Button>
              </Col>
              <Col xsPush={1} xs={1} xsOffset={2} smPush={0}  smOffset={0}  sm={1}>
                <Button type="reset" onClick={this.reset.bind(this)} bsStyle="primary">Reset</Button>
              </Col><br/><br/><br/>
              {
              this.state.error!=null?
                <Alert bsStyle="danger">
                  <Col xsOffset={5} smOffset={5} >
                    <strong>{this.state.error}</strong>
                  </Col>
                </Alert>
               :null
              }
              <div >
                <Col xsOffset={3} smOffset={4} >
                  <strong>
                    Don't have account?
                    <Link to="/register"> Register now</Link>
                  </strong>
                </Col>
              </div>
          </form>
        </div>
      );
    }
  }


export default Login;
