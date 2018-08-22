import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Input, Fa, Modal, ModalBody, ModalFooter } from 'mdbreact';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import firebase from 'firebase';
import Payment from '../Payment/Payment'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    }
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    this.setState({ totalPrice: this.props.cart.map(item => item.price).reduce((a, b) => a + b, 0) })
  }

  addButton(cell, row, enumObject, rowIndex) {
    return (<Button size="sm" color="primary" style={{ borderRadius: "50%" }} onClick={() => this.props.addToCart(row)} rounded> + </Button>);
  }

  subButton(cell, row, enumObject, rowIndex) {
    return (<Button size="sm" color="primary" style={{ borderRadius: "50%" }} onClick={() => this.props.removeFromCart(row)} rounded> - </Button>);
  }

  clearButton(cell, row, enumObject, rowIndex) {
    return (<Button size="sm" color="danger" onClick={() => this.props.removeAllFromCart(row)} rounded> x </Button>);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    console.log(this.state.totalPrice);
    return (
      <Container>
        <BootstrapTable data={sort(this.props.cart)} striped hover>
          <TableHeaderColumn isKey dataField='_id'>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='productName' dataSort>Product Name</TableHeaderColumn>
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
            <Input size="sm" label="Your email" icon="envelope" group type="email" validate error="wrong" success="right" />
            <Input size="sm" label="Password" icon="lock" group type="text" validate error="wrong" success="right" />
            <p className="font-small grey-text d-flex justify-content-middle">Need An Account? <Link to="/signup" className="dark-grey-text font-weight-bold ml-1"> Sign Up</Link></p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>{' '}
            <Payment total={this.state.totalPrice} />
            <a onClick={() => firebase.auth().signOut()}>cart page</a>
          </ModalFooter>
        </Modal>
      </Container>
    )
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