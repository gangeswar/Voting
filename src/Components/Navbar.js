import React, { Component } from 'react';
import {Nav, Navbar, NavItem , NavDropdown, MenuItem, FormGroup, FormControl} from 'react-bootstrap';
import {Jumbotron, Grid, Row, Col, Button, Image} from 'react-bootstrap'
import {Link, Redirect} from 'react-router-dom';
import user from '../media/user.png';
import './Navbar.css'

class Menubar extends Component{
  session(){
    localStorage.removeItem("user_id");
    if(localStorage.getItem("admin")) {
      localStorage.removeItem("admin");
      <Redirect to="/"></Redirect>
    }
  }

  userProfile(){
    if(localStorage.getItem("admin")) {
      <Redirect to="/user_profile" />
    }
  }
  render(){
    return (
      <div >
        <Navbar className="Menubar" inverse collapseOnSelect>
        {
          localStorage.getItem("user_id")==null?
        <Navbar.Header>
         <Navbar.Brand>
           <Link to="/">LOGO</Link>
         </Navbar.Brand>
         <Navbar.Toggle />
        </Navbar.Header>
        :null
      }
            <Navbar.Collapse>
              <Nav pullRight>
            {
              localStorage.getItem("user_id")==null?
              <NavItem eventKey={1} componentClass={Link} href="/register" to="/register">
                Register
              </NavItem>
              :null
            }
            {
              localStorage.getItem("user_id")!=null?
              <NavItem >
              <div className="dropdown">
                <img src={user} width="30" height="30" />
                  <div className="dropdown-content">
                  <Button onClick={this.userProfile.bind(this)}><Link to="/user_profile">Profile</Link></Button>
                  <Button onClick={this.session.bind(this)}><Link to="/">Log Out</Link></Button>
                  </div>
                </div>
              </NavItem>
              :null
            }
            </Nav>
            {
              localStorage.getItem("user_id")!=null?
            <Grid>
              <Row className="show-grid">
                <Col xsPull={2} smPull={5} mdPull={10} lgPull={20} >
                <Navbar className="sidenav" inverse collapseOnSelect>
                    <Link to="/">LOGO</Link>
                    <Link to="#"></Link>
                    <Link to="#"></Link>
                    <Link to="#"></Link>
                    <Link to="#"></Link>
                  </Navbar>
              </Col>
            </Row>
            </Grid>
            :null
          }
          </Navbar.Collapse>
    </Navbar>
      </div>
    );
}
}

export default Menubar;
