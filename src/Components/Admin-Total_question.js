import React, { Component } from 'react'
import { Button, Jumbotron, Col} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';


class AdminTotalquestion extends Component {
  constructor(){
      super();
  }

  onClickDeleteTotalQuestion(cell, row, totalQuestion){
    axios.get(`http://172.24.125.116:8000/api/question/${totalQuestion._id}/option`).then(res => {
      for (let index of res.data)
      {
        axios.delete(`http://172.24.125.116:8000/api/question/${totalQuestion._id}/option/${index._id}`);
      }
  }
).then(res => {axios.delete(`http://172.24.125.116:8000/api/question/${totalQuestion._id}`)}).then(res => window.location.reload()).catch(error => console.log(error));

}

   cellButton(cell, row, enumObject, rowIndex) {
     return (
        <Button
           onClick={() =>this.onClickDeleteTotalQuestion(cell, row, this.props.totalQuestion[rowIndex])}>
        Delete { rowIndex + 1 }
        </Button>
     )

  }
 render() {
   return (
    <BootstrapTable data={this.props.totalQuestion}>
      <TableHeaderColumn dataField='question'>
          Question
      </TableHeaderColumn>
      <TableHeaderColumn dataField='start_date' isKey>
         Start-date
       </TableHeaderColumn>
      <TableHeaderColumn dataField='end_date'>
        End-date
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField='button'
        dataFormat={this.cellButton.bind(this)}
      >
        Button
      </TableHeaderColumn>
   </BootstrapTable>
  )
 }
}



export default AdminTotalquestion;
