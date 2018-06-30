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
import Report from './Report'

const options = {
  onRowClick: function(row) {
    localStorage.setItem("value",row._id);
    window.location.reload();
  },
  onRowDoubleClick: function(row) {
    localStorage.setItem("value",row._id);
    window.location.reload();
  }
};


class Home extends Component {

  constructor() {
    super();
    this.state = {
      questions: [],
      row:null
    }
  }

  componentWillMount() {
    const json_value = [];
    axios.get(`http://172.24.125.116:8000/api/question/user/question`).then(res => {
      res.data.map(ans => {
        return json_value.push(ans)
      })
      this.setState({
        questions: json_value,
        row:localStorage.getItem("value")
      })
    });
  }

  // componentDidMount() {
  //   localStorage.removeItem("value");
  // }

  render() {
      console.log(this.state.questions);
      if(this.state.row==null){
      return (
        <div className="Home">
          <Jumbotron>
            <Col xsOffset={5} >
              <h2>Admin</h2>
            </Col>
          </Jumbotron>
          <BootstrapTable data={ this.state.questions } options={ options }>
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
   else{
     return(
       <Report row={this.state.row} />
     );
   }
 }
}


export default Home;
