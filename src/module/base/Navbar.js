import React, {
  Component
}
from 'react';
import {
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem
}
from 'react-bootstrap';
import {
  Grid,
  Row,
  Col
}
from 'react-bootstrap'
import {
  Link
}
from 'react-router-dom';
import user from '../../media/user.png';
import './Navbar.css'

class Menubar extends Component {

  constructor() {
    super();
    this.state = {
      isOpen: false
    }
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
  }

  handleClose = () => {
     this.setState({ isOpen: false })
  }

  session() {
    if (localStorage.getItem("admin")) {
      localStorage.clear();
    }
  }

  render() {
      return (
        <div >
          <Navbar className="Menubar" inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand >
                  <Link to="/"><h3>Voting</h3></Link>
                </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
              <Nav pullRight>

                {
                  localStorage.getItem("user_id")!=null && localStorage.getItem("admin")==="0"?
                  <NavItem className="nav-underline" eventKey={3} componentClass={Link} href="/question" to="/question">Voting List
                  </NavItem>
                  :null
                }

                {
                  localStorage.getItem("user_id")!==null && localStorage.getItem("admin")==="0"?
                  <NavItem className="nav-underline" eventKey={2} componentClass={Link} href="/question/myvoting" to="/question/myvoting">My Voting
                  </NavItem>
                  :null
                }

                {
                  localStorage.getItem("user_id")!==null && localStorage.getItem("admin")==="1"?
                  <NavItem className="nav-underline" eventKey={4} componentClass={Link} href="/totaluser" to="/totaluser">Total User
                  </NavItem>
                  :null
                }

                {
                  localStorage.getItem("user_id")!==null && localStorage.getItem("admin")==="1"?
                  <NavItem className="nav-underline" eventKey={5} componentClass={Link} href="/total" to="/total">Total Question
                  </NavItem>
                  :null
                }

                {
                  localStorage.getItem("user_id")!=null?
                    <NavDropdown eventKey={6}
                    title={
                      <div>
                       <img src={user}
                            alt="user pic"
                            width="30"
                            height="30"/>
                       <span> {localStorage.getItem("user_name")}</span>
                       </div>
                     }
                      onMouseEnter={ this.handleOpen }
                      onMouseLeave={ this.handleClose }
                      defaultOpen={ this.state.isOpen }
                      noCaret
                      id="language-switcher-container">
                      <MenuItem eventKey={6.1} componentClass={Link} href="/register" to="/register">Profile</MenuItem>
                      <MenuItem divider />
                      <MenuItem eventKey={6.2} componentClass={Link} onClick={this.session.bind(this)} href="/" to="/">logout</MenuItem>
                    </NavDropdown>
                  :null
                }

              </Nav>
              {
                null?
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
