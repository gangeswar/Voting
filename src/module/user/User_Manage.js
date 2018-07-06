import React, {
  Component
}
from 'react'
import {
  Button
}
from 'react-bootstrap';
import {
  BootstrapTable,
  TableHeaderColumn
}
from 'react-bootstrap-table';
import {
  Jumbotron,
  Col
}
from 'react-bootstrap';
import {
  Link,
  Redirect
}
from 'react-router-dom';
import axios from 'axios';


class UserManage extends Component {

  constructor() {
    super();
    this.state = {
      userDetail: []
    }
  }

  componentWillMount() {
    axios.get(`http://172.24.125.116:8000/api/user`).then(res => {
      this.setState({
        userDetail: res.data
      })
    }).catch(error => {
      console.log(error.response.error.message)
    });
  }

  onClickDeleteUserDetail(cell, row, rowIndex, userDetail) {
    axios.delete(`http://172.24.125.116:8000/api/user/${userDetail._id}`).then(res => {
      const array = this.state.userDetail;
      array.splice(rowIndex, 1);
      this.setState({
        userDetail: array
      });
    }).catch(error => console.log(error));
  }

  onClickAdmin(cell, row, rowIndex, userDetail,access) {
    axios.put(`http://172.24.125.116:8000/api/user/${userDetail._id}`,{
        isadmin:access
      })
  }

  cellButton(cell, row, enumObject, rowIndex) {
    return ( <Button bsStyle="danger" onClick={() => this.onClickDeleteUserDetail(cell, row, rowIndex, this.state.userDetail[rowIndex])}>
        Delete
        </Button>
    );
  }

  adminButton(cell, row, enumObject, rowIndex) {
    return (
      <div>
        <Button bsStyle="success" onClick={() => this.onClickAdmin(cell, row, rowIndex, this.state.userDetail[rowIndex],1)}>
          Admin Access
        </Button>
        <Button bsStyle="success" onClick={() => this.onClickAdmin(cell, row, rowIndex, this.state.userDetail[rowIndex],0)}>
          cancel Access
        </Button>
      </div>
    );
  }

 render() {
   if(localStorage.getItem("user_id")!=null && localStorage.getItem("admin")==="1") {
   return (
     <div>
       <Jumbotron>
         <Col xsOffset={5} smOffset={4} >
           <h1>User List</h1>
         </Col>
       </Jumbotron>
      <BootstrapTable data={this.state.userDetail}>
        <TableHeaderColumn dataField='email_id' filter={ { type: 'TextFilter', delay: 1000 } } dataSort>
          email_id
        </TableHeaderColumn>
        <TableHeaderColumn dataField='user_name' filter={ { type: 'TextFilter', delay: 1000 } } isKey dataSort>
           Name
         </TableHeaderColumn>
        <TableHeaderColumn
          dataField='button'
          dataFormat={this.cellButton.bind(this)}>
          Delete
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField='button'
          dataFormat={this.adminButton.bind(this)}>
          Admin
        </TableHeaderColumn>
     </BootstrapTable>
     <Col xsOffset={5} smOffset={5}>
       <Link to="/"> <Button bsSize="large">Back</Button></Link>
     </Col>
   </div>
  );
  } else {
    return(<Redirect to="/"/> );
    }
  }
}


export default UserManage;
