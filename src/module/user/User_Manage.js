import React, {
    Component
} from 'react'
import {
    Button
} from 'react-bootstrap';
import {
    BootstrapTable,
    TableHeaderColumn
} from 'react-bootstrap-table';
import {
    Jumbotron,
    Row,
    Col
} from 'react-bootstrap';
import {
    Link
} from 'react-router-dom';
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
        }).catch(error =>
        {
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

    cellButton(cell, row, enumObject, rowIndex) {
        return ( <Button onClick={() => this.onClickDeleteUserDetail(cell, row, rowIndex, this.state.userDetail[rowIndex])}>
            Delete {rowIndex + 1}
            </Button>
        );
    }
 render() {
   return (
     <div>
     <Jumbotron>
         <Col xsOffset={5} >
         <h2>User List</h2>
         </Col>
           <Link to="/"> <Button id="user" bsSize="large">Back</Button></Link>
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
        dataFormat={this.cellButton.bind(this)}
      >
        Button
      </TableHeaderColumn>
   </BootstrapTable>
   </div>
  )
 }
}



export default UserManage;
