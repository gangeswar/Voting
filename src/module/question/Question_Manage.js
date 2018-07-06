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
from 'react-bootstrap-table'
import {
  Link,
  Redirect
}
from 'react-router-dom';
import {
  Route
}
from "react-router-dom";
import {
  Jumbotron,
  Col
}
from 'react-bootstrap';
import axios from 'axios';
import QuestionAdd from './Question_Add';


class QuestionManage extends Component {
  constructor() {
    super();
    this.state = {
      totalQuestion: [],
      editQuestion: [],
      editOption: [],
      check: 1,
      update:true
    }
  }

  componentWillMount() {

    axios.get(`http://172.24.125.116:8000/api/question`).then(res => {
      this.setState({
        totalQuestion: res.data
      })
    }).catch(error => {
      console.log(error.response.error.message)
    });
  }

  componentDidUpdate(){
    if(this.state.update)
      axios.get(`http://172.24.125.116:8000/api/question`).then(res => {
        this.setState({
          totalQuestion: res.data
        })
      }).then(doc=> {
        this.setState({
          update:false
        })
    })
  }

  onClickDeleteTotalQuestion(cell, row, rowIndex, totalQuestion) {
    axios.get(`http://172.24.125.116:8000/api/question/${totalQuestion._id}/option`).then(res => {
      for (let index of res.data) {
        axios.delete(`http://172.24.125.116:8000/api/option/${index._id}`);
      }
    }).then(res => {
      axios.delete(`http://172.24.125.116:8000/api/question/${totalQuestion._id}`)
    }).then(res => {
      const array = this.state.totalQuestion;
      array.splice(rowIndex, 1);
      this.setState({
        totalQuestion: array
      });
    }).catch(error => console.log(error));
  }

  onClickEditQuestion(cell, row, index) {
    this.setState({
      editQuestion: this.state.totalQuestion[index]
    });
    axios.get(`http://172.24.125.116:8000/api/question/${this.state.totalQuestion[index]._id}/option`).then(res => {
      this.setState({
        editOption: res.data
      });
    }).then(this.props.history.replace(`/totalquestion/edit/${this.state.totalQuestion[index]._id}`))
    this.setState({
      check: 0
    })
  }

  deleteButton(cell, row, enumObject, rowIndex) {
    return ( <Button bsStyle="danger" onClick={ () => this.onClickDeleteTotalQuestion(cell, row, rowIndex, this.state.totalQuestion[rowIndex])}> Delete </Button>);
  }

  editButton(cell, row, enumObject, rowIndex) {
    return ( <Button bsStyle="info" onClick={ () => this.onClickEditQuestion(cell, row, rowIndex)}>Edit </Button>);
  }

 render() {

   if(localStorage.getItem("user_id")!=null && localStorage.getItem("admin")==="1") {
     if(this.state.check) {
       function dateFormatter(old, row) {
         var cell = new Date(old);
         return `${('0' + cell.getDate()).slice(-2)}/${('0' + (cell.getMonth() + 1)).slice(-2)}/${cell.getFullYear()}`;
       }

       return (
       <div>
         <Jumbotron>
           <Col xsOffset={4} smOffset={4}>
              <h1>List Question</h1>
           </Col>
              <Link to="/question/add"><Button className="add-button" bsStyle="success" bsSize="large">AddQuestion</Button></Link>
         </Jumbotron>
       <BootstrapTable data={this.state.totalQuestion}>
          <TableHeaderColumn dataField='question' filter={ { type: 'TextFilter', delay: 1000 } } isKey dataSort>
            Question
          </TableHeaderColumn>
          <TableHeaderColumn dataField='start_date' dataFormat={ dateFormatter } filter={ { type: 'DateFilter', delay: 1000 } } dataSort>
            Start-date
          </TableHeaderColumn>
          <TableHeaderColumn dataField='end_date' dataFormat={ dateFormatter } filter={ { type: 'DateFilter', delay: 1000 } } dataSort>
            End-date
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='button'
            dataFormat={this.deleteButton.bind(this)}>
            Delete
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='button'
            dataFormat={this.editButton.bind(this)}>
            Update
          </TableHeaderColumn>
        </BootstrapTable>
        <Col xsOffset={5} smOffset={5}>
          <Link to="/"> <Button bsSize="large">Back</Button></Link>
        </Col>
      </div>
        );
  }
  return (
    <Route path="/totalquestion/edit/:questionId" component={ () => <QuestionAdd check={this.state.check} editOption={this.state.editOption} editQuestion={this.state.editQuestion} />}/>
  );
 } else {
   return(
     <Redirect to="/"/>
    );
    }
  }
}


export default QuestionManage;
