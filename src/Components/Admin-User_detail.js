import React, { Component } from 'react'
import { Button, Jumbotron, Col} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import axios from 'axios';



class AdminUserdetail extends Component {

  onClickDeleteUserDetail(cell, row, userDetail){
    axios.delete(`http://172.24.125.116:8000/api/user/${userDetail._id}`).then(res => window.location.reload()).catch(error => console.log(error));

   }

   cellButton(cell, row, enumObject, rowIndex) {
     return (
        <Button
           onClick={() =>this.onClickDeleteUserDetail(cell, row, this.props.userDetail[rowIndex])}>
        Delete { rowIndex + 1 }
        </Button>
     )

  }
 render() {
   return (
    <BootstrapTable data={this.props.userDetail}>
      <TableHeaderColumn dataField='email_id'>
        email_id
      </TableHeaderColumn>
      <TableHeaderColumn dataField='user_name' isKey>
         Name
       </TableHeaderColumn>
      <TableHeaderColumn dataField='password'>
        password
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



export default AdminUserdetail;
