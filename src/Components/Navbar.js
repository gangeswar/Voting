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
            <Nav pullRight>
              <NavItem eventKey={1} componentClass={Link} href="/register" to="/register">
                Register
              </NavItem>
            </Nav>

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
          </Navbar.Collapse>
    </Navbar>
      </div>
    );
  }
}

export default Menubar;
