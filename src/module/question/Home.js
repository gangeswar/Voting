import React, {
  Component
}
from 'react';
import {
  Jumbotron,
  Col
}
from 'react-bootstrap';
import {
  BootstrapTable,
  TableHeaderColumn
}
from 'react-bootstrap-table';
import axios from 'axios';


class Home extends Component {

  constructor() {
    super();
    this.state = {
      questions: [],
      row:null
    }
  }

  componentWillMount() {
    axios.get(`http://172.24.125.116:8000/api/question/user/question`).then(res => {
      this.setState({
        questions: res.data
      })
    })
  }

  render() {
      return (
        <div className="Home">
          <Jumbotron>
            <Col xsOffset={5} >
              <h2>Admin</h2>
            </Col>
          </Jumbotron>
          <BootstrapTable data={this.state.questions} >
            <TableHeaderColumn dataField='_id' isKey >
              Question Id
            </TableHeaderColumn>
            <TableHeaderColumn dataField='question' filter={ { type: 'TextFilter', delay: 1000 } } dataSort>
              Question
            </TableHeaderColumn>
            <TableHeaderColumn  ref='count' dataField='TotalCount'  filter={ { type: 'TextFilter', delay: 1000 } } dataSort>
              User Attended
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
   }
}


export default Home;
