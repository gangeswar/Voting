import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Input, Fa, Modal, ModalBody, ModalFooter } from 'mdbreact';
import { Alert } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';

import config from '../../config.json';

import Payment from '../Payment/Payment'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      error: '',
      emailId: '',
      password: '',
      login:0
    }
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    this.setState({ totalPrice: this.props.cart.map(item => item.price).reduce((a, b) => a + b, 0) })
  }

  addButton(cell, row, enumObject, rowIndex) {
    return (<Button size="sm" color="primary" style={{ borderRadius: "50%" }} onClick={() => this.props.addToCart(row)} rounded><strong><h5>+</h5></strong> </Button>);
  }

  subButton(cell, row, enumObject, rowIndex) {
    return (<Button size="sm" color="primary" style={{ borderRadius: "50%" }} onClick={() => this.props.removeFromCart(row)} rounded><strong><h5>-</h5></strong></Button>);
  }

  clearButton(cell, row, enumObject, rowIndex) {
    return (<Button size="sm" color="danger" onClick={() => this.props.removeAllFromCart(row)} rounded> x </Button>);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleEmailChange(event) {
    this.setState({
      emailId: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  login(event) {
    event.preventDefault();
    axios.post(config.url.login, {
      emailId: this.state.emailId,
      password: this.state.password
    }).then(result => {
      this.setState({
        validation: true,
        error: '',
        login:1
      });
    }).catch(err => {
      this.setState({
        validation: false,
        error: "Invalid EmailId or password"
      });
    });
  }

  render() {
    if(this.state.login===1) {return(
      <Payment total={this.state.totalPrice} />
    )}
    else {
    return (
      <Container>
        <BootstrapTable data={sort(this.props.cart)} striped hover>
          <TableHeaderColumn isKey dataField='productName' dataSort>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='quantity' dataSort>Product Quantity</TableHeaderColumn>
          <TableHeaderColumn dataField='price' dataSort>Product Price</TableHeaderColumn>
          <TableHeaderColumn dataField='button' dataFormat={this.addButton.bind(this)}>Add</TableHeaderColumn>
          <TableHeaderColumn dataField='button' dataFormat={this.subButton.bind(this)}>Sub</TableHeaderColumn>
          <TableHeaderColumn dataField='button' dataFormat={this.clearButton.bind(this)}>Remove Item</TableHeaderColumn>
        </BootstrapTable>
        <Button color="info" onClick={this.toggle}>Check-Out</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="cascading-modal">
          <div className="modal-header primary-color white-text">
            <h4 className="title">
              <Fa className="fa fa-user" /> Log In</h4>
            <button type="button" className="close" onClick={this.toggle}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <ModalBody className="grey-text">
            <Input size="sm" label="Email" icon="envelope" group type="email" ref="emailId" validate error="wrong" onChange={this.handleEmailChange.bind(this)} value={this.state.emailId} success="right" />
            <Input size="sm" label="Password" icon="lock" group type="password" ref="password" onChange={this.handlePasswordChange.bind(this)} value={this.state.password} validate />
            {this.state.error === '' ? null : <Alert color="danger"> {this.state.error}
            </Alert>}
            <p className="font-small grey-text d-flex justify-content-middle">Need An Account? <Link to="/signup" className="dark-grey-text font-weight-bold ml-1"> Sign Up</Link></p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.login.bind(this)}>Login</Button>
          </ModalFooter>
        </Modal>
      </Container>
    )
  }
}
}

function sort(items) {
  return items.sort((a, b) => a._id < b._id)
}

const mapStateToProbs = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  addToCart: (item) => {
    dispatch({ type: "ADD", payload: item })
  },
  removeFromCart: (item) => {
    dispatch({ type: "REMOVE", payload: item })
  },
  removeAllFromCart: (item) => {
    dispatch({ type: "REMOVE_ALL", payload: item })
  },
})

export default connect(mapStateToProbs, mapDispatchToProps)(Cart);