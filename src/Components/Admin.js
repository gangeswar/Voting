import React, { Component } from 'react';
import {Col, Row, Jumbotron} from 'react-bootstrap'
import add_que from '../media/add_question.png';
import {Link} from 'react-router-dom';
import "./Admin.css";
import './Admin-add.css';

class Admin extends Component {
  render() {
    return (
      <div className="Admin" >
      <Jumbotron>
          <Col xs={14} xsOffset={6}>
              <h2>Admin</h2>
          </Col>
        </Jumbotron>
        <Row className="box-space">
          <Col xsOffset={3} xs={6} sm={4} md={3}>
          <Link to="#" className="btn btn-sq-lg btn-info">
                <br/> <br/><br/>
                 Status progress Graph
          </Link>
          </Col>
          <Col xs={6}  sm={4}  md={3}>
          <Link to="#" className="btn btn-sq-lg btn-warning">
                 <br/> <br/><br/>
                 Today Login User
          </Link>
          </Col>
          <Col xs={6}  sm={4}  md={3}>
          <Link to="#" className="btn btn-sq-lg btn-success">
                <br/> <br/><br/>
                 Total User
          </Link>
          </Col>

        </Row>
        <Row className="box-space">
          <Col xsOffset={3} xs={6} sm={4} md={3}>
          <Link to="#" className="btn btn-sq-lg  btn-primary">
                 <br/> <br/><br/>
                 Total Question
          </Link>
          </Col>
          <Col xs={6} sm={4}  md={3}>
            <Link to="admin/add_question"><img id="plus" src={add_que} width="170" height="170" /></Link>
          </Col>
          <Col xs={6}  sm={4}  md={3}>
          <Link to="#" className="btn btn-sq-lg btn-danger">
                 <br/> <br/><br/>
                 Available Question
          </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Admin;
