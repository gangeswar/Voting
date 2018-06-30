import React, {
  Component
}
from 'react';
import {
  Nav,
  Navbar,
  NavItem
}
from 'react-bootstrap';
import {
  Grid,
  Row,
  Col,
  Button
}
from 'react-bootstrap'
import {
  Link
}
from 'react-router-dom';
import user from '../../media/user.png';
import logo from '../../media/fingerprint2.png';
import './Navbar.css'

class Menubar extends Component {
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
                <Link to="/"><img src={logo} alt="logo" width="65" height="55" /></Link>
              <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
              <Nav pullRight>
                {
                  localStorage.getItem("user_id")===null?
                  <NavItem eventKey={1} componentClass={Link} href="/register" to="/register">
                    Register
                  </NavItem>
                  :null
                }

                {
                  localStorage.getItem("user_id")!=null && localStorage.getItem("admin")==="0"?
                  <NavItem eventKey={3} componentClass={Link} href="/question" to="/question">QuestionList
                  </NavItem>
                  :null
                }

                {
                  localStorage.getItem("user_id")!==null && localStorage.getItem("admin")==="0"?
                  <NavItem eventKey={2} componentClass={Link} href="/question/myvoting" to="/question/myvoting">Myvoting
                  </NavItem>
                  :null
                }

                {
                  localStorage.getItem("user_id")!==null && localStorage.getItem("admin")==="1"?
                  <NavItem eventKey={4} componentClass={Link} href="/question/totaluser" to="/question/totaluser">Total User
                  </NavItem>
                  :null
                }

                {
                  localStorage.getItem("user_id")!==null && localStorage.getItem("admin")==="1"?
                  <NavItem eventKey={5} componentClass={Link} href="/question/totalquestion" to="/question/totalquestion">Total Question
                  </NavItem>
                  :null
                }

                {
                  localStorage.getItem("user_id")!=null?
                  <NavItem >
                  <div className="dropdown">
                    <img src={user} alt="user" width="30" height="30" /><span>  {localStorage.getItem("user_name")}</span>
                      <div className="dropdown-content">
                      <Button className="dropbtn" ><Link to="/register">Profile</Link></Button>
                      <Button className="dropbtn" onClick={this.session.bind(this)}><Link to="/">Log Out</Link></Button>
                      </div>
                    </div>
                  </NavItem>
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
