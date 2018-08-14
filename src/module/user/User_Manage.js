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
  Col,
  Grid
}
from 'react-bootstrap';
import {
  Link,
  Redirect
}
from 'react-router-dom';
import axios from 'axios';
import Pagination from '../base/Pagination';
import config from '../config.json';

class UserManage extends Component {

  constructor() {
    super();
    this.state = {
      userDetail: [],
      renderedUsers: [],
      page: 1,
      update:true,
    }
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentWillMount() {
    axios.get(config.url.user).then(res => {
      this.setState({
        userDetail: res.data,
        renderedUsers: res.data.slice(0, 5),
        total: res.data.length
      })
    }).catch(error => {
      console.log(error.response.error.message)
    });
  }

  handlePageChange(page) {
    const renderedUsers = this.state.userDetail.slice((page - 1) * 5, (page - 1) * 5 + 5);
    this.setState({page, renderedUsers});
  }

  componentDidUpdate(){
    if(this.state.update) {
      setTimeout(() => {
        axios.get(config.url.user)
          .then(res => this.setState({
            userDetail: res.data,
            renderedUsers: res.data.slice((this.state.page - 1) * 5, (this.state.page - 1) * 5 + 5),
            total: res.data.length,
            update:false
          }))
      })
    }
  }

  onClickDeleteUserDetail(cell, row, rowIndex, userDetail) {
    axios.get(config.url.user)
      .then(res => this.setState({
        userDetail: res.data,
        renderedUsers: res.data.slice((this.state.page - 1) * 5, (this.state.page - 1) * 5 + 5),
        total: res.data.length,
        update:true
      }))
    axios.delete(`http://172.24.125.116:8000/api/user/${userDetail._id}`);
  }

  onClickAdmin(cell, row, rowIndex, userDetail,access) {
    axios.get(config.url.user)
      .then(res => this.setState({
        userDetail: res.data,
        renderedUsers: res.data.slice((this.state.page - 1) * 5, (this.state.page - 1) * 5 + 5),
        total: res.data.length
      }))
    axios.put(`${config.url.user}/${userDetail._id}`,{
        isadmin:access
      })
    this.setState({update:true});
  }

  cellButton(cell, row, enumObject, rowIndex) {
    return (
      <div>
      {
        row.isadmin===0?
        <Button bsStyle="danger" onClick={() => this.onClickDeleteUserDetail(cell, row, rowIndex, this.state.renderedUsers[rowIndex])}>
          Delete
        </Button>
        :null
      }
    </div>
    );
  }

  adminButton(cell, row, enumObject, rowIndex) {
    return (
      <div>
      {
        row.isadmin===0?
        <Button bsStyle="success" onClick={() => this.onClickAdmin(cell, row, rowIndex, this.state.renderedUsers[rowIndex],1)}>
          Admin Access
        </Button>
        :
        <Button bsStyle="warning" onClick={() => this.onClickAdmin(cell, row, rowIndex, this.state.renderedUsers[rowIndex],0)}>
          Cancel Access
        </Button>
      }
      </div>
    );
  }

 render() {
     const { page, total } = this.state;
     if(localStorage.getItem("user_id")!=null && localStorage.getItem("admin")==="1") {
     return (
       <div>
         <Jumbotron>
           <Col xsOffset={4} smOffset={4} >
             <h1>User List</h1>
           </Col>
         </Jumbotron>
         <Grid bsClass="container">
          <BootstrapTable data={this.state.renderedUsers}>
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
       </Grid>
       <Pagination
       margin={2}
       page={page}
       count={Math.ceil(total / 5)}
       onPageChange={this.handlePageChange}
       />
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
