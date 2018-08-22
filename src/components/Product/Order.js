import React, { Component } from 'react'
import axios from 'axios';
import { Container, Row, Card, CardImage, CardBody, CardText, CardTitle, CardFooter, Button} from 'mdbreact';
import {Col} from 'reactstrap';
import { connect } from 'react-redux';

import config from '../../config.json';

class Order extends Component {

  constructor() {
    super();
    this.state = {
      product:[]
    }
  }

  componentWillMount() {
    axios.get(`${config.url.shop}/${this.props.productId}`)
    .then(product=>{
      this.setState({product:product.data}) 
    })
    .catch(error=>{
      console.log(error);
    })
  }

  render() {
    return (
        <Container>
        <section className="text-center my-5">
              <Row>
                {
                  this.state.product.map(productList => (
                  <Col key={productList._id} md={{ size: 4, offset: 4 }}>
                    <Card narrow ecommerce className="mb-2" style={{height:'500px',width:'300px'}}>
                      <CardImage cascade top src={require(`Media/${productList.image}`)} style={{height:'500px',width:'300px'}} alt="sample photo"/>
                      <CardBody cascade>
                        <CardTitle><strong>{productList.productName}</strong></CardTitle>
                        <CardText><strong>{productList.description}</strong></CardText>
                        <CardFooter className="px-1">
                          <span className="float-left">
                          {productList.price}$
                          </span>
                          <Button onClick={()=> this.props.addToCart(productList)} size="sm" color="secondary" rounded>Add ToCart { (this.props.cart.filter(item => item._id === productList._id)[0] && this.props.cart.filter(item => item._id === productList._id)[0].quantity) || 0}</Button>
                          <span className="float-right">
                          {productList.quantity} in-stock
                          </span>
                        </CardFooter>
                      </CardBody>
                    </Card>
                  </Col>
                  ))
                }
                </Row>
        </section>
      </Container>
    )
  }
}

const mapStateToProbs = state => ({
  cart: state.cart
})

const mapDispatchToProps= dispatch => ({
  addToCart: (item) => {
    dispatch({ type:"ADD", payload: item })
  }, 
  removeFromCart: (item) => {
    dispatch({ type: "REMOVE", payload: item })
  },
}) 

export default connect(mapStateToProbs, mapDispatchToProps) (Order);