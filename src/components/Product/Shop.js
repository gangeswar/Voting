import React, { Component } from 'react';
import { Container, Row, Col, Card, CardImage, CardBody, CardTitle, CardText, CardFooter, Tooltip} from 'mdbreact';

class Shop extends Component {

  render() {
    return(
      <Container>
        <section className="text-center my-5">
          <h2 className="h1-responsive font-weight-bold text-center my-5">Our bestsellers</h2>
          <p className="grey-text text-center w-responsive mx-auto mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam eum porro a pariatur veniam.</p>
              <Row>
                  <Col md="4">
                    <Card narrow ecommerce className="mb-2">
                      <CardImage cascade top src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img%20(39).jpg" alt="sample photo"/>
                      <CardBody cascade>
                        <a href="" className="text-muted">
                          <h5>Shoes</h5>
                        </a>
                        <CardTitle><strong><a href="">Leather boots</a></strong></CardTitle>
                        <CardText>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci.</CardText>
                        <CardFooter className="px-1">
                          <span className="float-left">69$</span>
                          <span className="float-right">
                            <Tooltip placement="top" tag="a" component="i" componentClass="fa fa-eye grey-text ml-3" tooltipContent="Quick look"/>
                            <Tooltip placement="top" tag="a" component="i" componentClass="fa fa-heart grey-text ml-3" tooltipContent="Add to watchlist"/>
                          </span>
                        </CardFooter>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="4" >
                    <Card narrow ecommerce className="mb-2">
                      <CardImage cascade top src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/img%20(22).jpg" alt="sample photo"/>
                      <CardBody cascade>
                        <a href="" className="text-muted">
                          <h5>Jeans</h5>
                        </a>
                        <CardTitle><strong><a href="">Slim jeans</a></strong></CardTitle>
                        <CardText>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci.</CardText>
                        <CardFooter className="px-1">
                          <span className="float-left">99$</span>
                          <span className="float-right">
                            <Tooltip placement="top" tag="a" component="i" componentClass="fa fa-eye grey-text ml-3" tooltipContent="Quick look"/>
                            <Tooltip placement="top" tag="a" component="i" componentClass="fa fa-heart grey-text ml-3" tooltipContent="Add to watchlist"/>
                          </span>
                        </CardFooter>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="4" >
                    <Card narrow ecommerce className="mb-2">
                      <CardImage cascade top src="https://mdbootstrap.com/img/Photos/Others/img%20(31).jpg" alt="sample photo"/>
                      <CardBody cascade>
                        <a href="" className="text-muted">
                          <h5>Shorts</h5>
                        </a>
                        <CardTitle><strong><a href="">Denim shorts</a></strong></CardTitle>
                        <CardText>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci.</CardText>
                        <CardFooter className="px-1">
                          <span className="float-left">49$</span>
                          <span className="float-right">
                            <Tooltip placement="top" tag="a" component="i" componentClass="fa fa-eye grey-text ml-3" tooltipContent="Quick look"/>
                            <Tooltip placement="top" tag="a" component="i" componentClass="fa fa-heart grey-text ml-3" tooltipContent="Add to watchlist"/>
                          </span>
                        </CardFooter>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                
        </section>

      </Container>
    );
  };
}

export default Shop;