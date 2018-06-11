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
      <Jumbotron >
          <Col xs={14} xsOffset={6} >
              <h2>Admin</h2>
          </Col>
        </Jumbotron>
        <Row className="box-space">
          <Col xsPush={3}  sm={4}  mdPush={3}>
          <Link to="/admin/userdetail" className="btn btn-sq-lg btn-success">
                <br/> <br/><br/>
                 Total User
          </Link>
          </Col>
          <Col xsPush={2} smPush={2}  md={2}>
            <Link to="admin/add_question"><img id="plus" src={add_que} width="170" height="170" /></Link>
          </Col>
          <Col xsPush={3} sm={2} >
          <Link to="/admin/totalquestion" className="btn btn-sq-lg  btn-primary">
                 <br/> <br/><br/>
                 Total Question
          </Link>

          </Col>
          </Row>
      </div>
    );
  }
}

export default Admin;
