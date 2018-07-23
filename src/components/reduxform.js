import React, { Component } from 'react';
import { Input, Button } from 'mdbreact';
import { Row, Col } from 'reactstrap';
import {connect} from 'react-redux';
import { CreatePost } from '../action/fetchPost';

class reduxform extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: ""
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.CreatePost(
      {
        title: this.state.title,
        body: this.state.body
      }
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Col xs={{ size: 'auto', offset: 5 }}>
            <h2>Redux-Form</h2>
          </Col>
          <Row>
            <Col xs={{ size: '5', offset: 4 }}>
              <Input type="text" label="Title" name="title" icon="user" defaultValue={this.state.title} onChange={this.handleChange.bind(this)} />
            </Col>
          </Row>
          <Row>
            <Col xs={{ size: '5', offset: 4 }}>
              <Input type="textarea" label="Body" name="body" icon="pencil" defaultValue={this.state.body} onChange={this.handleChange.bind(this)} />
            </Col>
          </Row>
          <Row>
            <Col xs={{ size: '5', offset: 4 }}>
              <Button type="submit" color="success">Success</Button>
            </Col>
          </Row>
        </form>
      </div>
    )
  }
}

export default connect(null, {CreatePost})(reduxform);