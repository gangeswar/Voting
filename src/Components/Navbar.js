import React, { Component } from 'react';
import {Nav, Navbar, NavItem , NavDropdown, MenuItem, FormGroup, FormControl} from 'react-bootstrap';
import {Jumbotron, Grid, Row, Col, Button, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import './Navbar.css'

class Menubar extends Component {
  render() {
    return (
      <div >
        <Navbar className="Menubar" inverse collapseOnSelect>
            <Navbar.Collapse>
              <Navbar.Form>
                <Col xs={4} xsOffset={4}>
                  <FormControl type="text" id="search" name="search" placeholder="Search.." />
                </Col>
              </Navbar.Form>

            <Nav pullRight>
              <NavItem eventKey={1} componentClass={Link} href="/question" to="/question">
                User
              </NavItem>
              <NavItem eventKey={2} componentClass={Link} href="/admin" to="/admin">
              Admin
              </NavItem>
            </Nav>

            <Grid>
              <Row className="show-grid">
                <Col xsPull={2} smPull={5} mdPull={10} lgPull={20} >
                <Navbar className="sidenav" inverse collapseOnSelect>
                    <Link to="/">LOGO</Link>
                    <Link to="#">About</Link>
                    <Link to="#">Services</Link>
                    <Link to="#">Clients</Link>
                    <Link to="#">Contact</Link>
                  </Navbar>
              </Col>
            </Row>
            </Grid>
          </Navbar.Collapse>
    </Navbar>
      </div>
    );
  }
}

export default Menubar;
