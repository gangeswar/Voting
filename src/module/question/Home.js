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
import {
  Redirect
}
from 'react-router-dom';
import axios from 'axios';
import "./Question.css";
import Report from './Report'

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
    console.log(this.props);
    axios.get(`http://172.24.125.116:8000/api/question/user/question`).then(res => {
      this.setState({
        questions: res.data
      })
    })
  }

  componentDidMount() {
    this.props.history.push("/report");
  }

  render() {
      const options = {
        onRowClick:(row)=> {
          this.setState(
            {
              row:row._id,
              options:row.option,
              question:row.question,
              endDate:row.end_date
            }
          )
          this.props.history.push(`/report/${row._id}`);
        },
        onRowDoubleClick:(row)=> {
          this.setState(
            {
              row:row._id,
              options:row.option,
              question:row.question,
              endDate:row.end_date
            }
          )
          this.props.history.push(`/report/${row._id}`);
        }
      };
    if(localStorage.getItem("user_id")!=null && localStorage.getItem("admin")==="1") {
      if(this.state.row==null) {
        return (
          <div className="Home" >
            <Jumbotron>
              <Col xsOffset={5} smOffset={5}>
                <h1>Report</h1>
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
    } else {

     return(
       <div>
         <Report row={this.state.row} options={this.state.options} question={this.state.question} endDate={this.state.endDate}/>
       </div>
     );
   }
 } else {
   return(
     <Redirect to="/"/>
   );
 }
}
}


export default Home;
