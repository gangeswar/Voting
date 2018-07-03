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
import "./Question.css";
import Report from './Report'

const options = {
  onRowClick: function(row) {
    localStorage.setItem("rowId",row._id);
    localStorage.setItem("options",JSON.stringify(row.option));
    localStorage.setItem("question",row.question);
    localStorage.setItem("end_date",row.end_date);
    window.location.reload();
  },
  onRowDoubleClick: function(row) {
    localStorage.setItem("rowId",row._id);
    localStorage.setItem("options",JSON.stringify(row.option));
    localStorage.setItem("question",row.question);
    localStorage.setItem("end_date",row.end_date);
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
        options: JSON.parse(localStorage.getItem("options")),
        question: localStorage.getItem("question"),
        endDate: localStorage.getItem("end_date")
      })
    })
  }

  render() {
      if(this.state.row==null){
      return (
        <div className="Home" >
          <Jumbotron>
            <Col xsOffset={5} >
              <h2>Admin</h2>
            </Col>
          </Jumbotron>
          <BootstrapTable data={ this.state.questions } options={ options } hover >
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
       <Report row={this.state.row} options={this.state.options} question={this.state.question} endDate={this.state.endDate}/>
     );
   }
 }
}


export default Home;
