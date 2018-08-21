import React, { Component } from 'react';
import { Container, Row, Col, Card} from 'mdbreact';
import axios from 'axios';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      image:[]
    }
  }

  componentWillMount() {
    axios.get("http://172.24.125.116:8000/api/image")
    .then(image=>{
      console.log(image);
      this.setState({image:image.data}) 
    })
    .catch(error=>{
      console.log(error);
    })
  }
  
  render() {
    return (
      <div>
      <Container>
        <section className="text-center my-5">
          <h2 className="h1-responsive font-weight-bold text-center my-5">ONLINE SHOPPING</h2>
          <p className="grey-text text-center w-responsive mx-auto mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam eum porro a pariatur veniam.</p>
          <Row>
          {
            this.state.image.map(imageList => (
                <Col key={imageList._id} lg="3" md="6" className="mb-lg-0 mb-4">
                  <Card collection className="z-depth-1-half">
                    <div className="view zoom">
                        <img src={require(`Media/${imageList.image}`)} alt='some text' className="img-fluid"/>
                    </div>
                  </Card>
                </Col>
            ))
          }
          </Row>
        </section>
      </Container>
      
      </div>
    );
  };
}

export default Home;