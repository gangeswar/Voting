import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { FetchPost } from '../action/fetchPost';

class redux extends Component {
  componentWillMount() {
    this.props.FetchPost();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newForm) {
      this.props.reduxForm.unshift(nextProps.newForm);
    }
  }

  render() {
    const postValue = this.props.reduxForm.map(result => (
      <ul key={result.id}>
        <li><h3>{result.title}</h3></li>
        <p>{result.body}</p>
      </ul>)
    );
    return (
      <div>
        <Container>
          <h1>Redux List:-</h1>
          {postValue}
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  reduxForm: state.reduxForm.items,
  newForm: state.reduxForm.item
})

export default connect(mapStateToProps, { FetchPost })(redux)
