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
    localStorage.setItem("rowId",row._id);
    localStorage.setItem("options",JSON.stringify(row.option));
    window.location.reload();
  },
  onRowDoubleClick: function(row) {
    localStorage.setItem("rowId",row._id);
    localStorage.setItem("options",JSON.stringify(row.option));
    window.location.reload();
  }
};


class Home extends Component {

  constructor() {
    super();
    this.state = {
      questions: [],
      options:[],
      row:null
    }
  }

  componentWillMount() {
    axios.get(`http://172.24.125.116:8000/api/question/user/question`).then(res => {
      this.setState({
        questions: res.data,
        row: localStorage.getItem("rowId"),
        options: JSON.parse(localStorage.getItem("options"))
      })
    })
  }

  // componentDidMount() {
  //   localStorage.removeItem("value");
  // }

  render() {
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
       <Report row={this.state.row} options={this.state.options} />
     );
   }
 }
}


export default Home;
