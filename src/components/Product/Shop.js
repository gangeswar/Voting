import React, { Component } from 'react';
import axios from 'axios';

import Order from './Order';

import { Container, Row, Col, Card, CardImage, CardBody, CardText, Button, CardFooter, Tooltip} from 'mdbreact';

class Shop extends Component {

  constructor() {
    super();
    this.state = {
      shop:[],
      order:0
    }
  }

  componentWillMount() {
    axios.get("http://172.24.125.116:8000/api/product")
    .then(shop=>{
      console.log(shop);
      this.setState({shop:shop.data}) 
    })
    .catch(error=>{
      console.log(error);
    })
  }

  productClick(event) {
    this.setState({
      order:1,
      productId: event.target.name
    })
  }

  render() {
    return(
      this.state.order===0?
      <Container>
        <section className="text-center my-5">
          <h2 className="h1-responsive font-weight-bold text-center my-5">Our Products</h2>
              <Row>
                {
                  this.state.shop.map(productList => (
                  <Col key={productList._id} md="4">
                    <Card narrow ecommerce className="mb-2" style={{height:'300px',width:'250px'}}>
                      <CardImage cascade top src={require(`Media/${productList.image}`)} style={{height:'500px',width:'250px'}} alt="sample photo"/>
                      <CardBody cascade>
                        <CardText><strong>{productList.productName}</strong></CardText>
                        <CardFooter className="px-1">
                          <span className="float-left">
                          {productList.price}$
                            <Button onClick={this.productClick.bind(this)} name={productList._id} size="sm" color="secondary" rounded>shop now</Button>
                            <Tooltip placement="top" tag="a" component="i" componentClass="fa fa-heart grey-text ml-3" tooltipContent="Add to watchlist"/>
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
      :<Order productId={this.state.productId}/>
       );
    
  };
}

export default Shop;