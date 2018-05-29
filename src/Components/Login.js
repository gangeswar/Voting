import React, { Component } from 'react';
import { FormGroup, FormControl} from 'react-bootstrap';
import { Jumbotron, Grid, Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="Login">
      <Jumbotron>
          <Col xs={14} xsOffset={6}>
              <h2>Login</h2>
          </Col>
        </Jumbotron>
        <Row className="row-space">
          <Col xsPush={1} xs={3} xsOffset={4}>
            <input className="form-control" type="text" ref="User" placeholder="User-Name" />
          </Col>
        </Row>
        <Row className="row-space">
          <Col xsPush={1} xs={3} xsOffset={4}>
            <input className="form-control" type="text" ref="Password" placeholder="Password" />
          </Col>
        </Row>
        <Col xsPush={1} xs={1} xsOffset={4}>
            <Link to="/question"><Button bsStyle="success">Login</Button></Link>
        </Col>
        <Col xsPull={1} xs={2} xsOffset={2}>
            <Button bsStyle="danger">Reset</Button>
        </Col>
      </div>
    );
  }
}

export default Login;
