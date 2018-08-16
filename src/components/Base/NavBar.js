import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavItem,
  NavLink,
  NavbarToggler
} from 'mdbreact';

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      dropdownOpen: false
    };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <Navbar color="purple" dark expand="lg">
        <NavbarBrand> 
          <NavLink to="/">
            <strong>Navbar</strong>
          </NavLink>
        </NavbarBrand>
        {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
        <Collapse isOpen={this.state.collapse} navbar>
          <NavbarNav left>
            <NavItem >
              <NavLink className="nav-link" to="/shop">My Shop</NavLink>
            </NavItem>
          </NavbarNav>
          <NavbarNav right>
            <NavItem >
              <NavLink className="nav-link" to="/cart"><i className="fa fa-shopping-cart" aria-hidden="false"></i></NavLink>
            </NavItem>
          </NavbarNav>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavBar;