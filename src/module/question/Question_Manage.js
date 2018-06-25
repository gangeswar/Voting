import React, {
    Component
} from 'react'
import {
    Button
} from 'react-bootstrap';
import {
    BootstrapTable,
    TableHeaderColumn
} from 'react-bootstrap-table'
import {
    Link
} from 'react-router-dom';
import {
    Jumbotron,
    Row,
    Col
} from 'react-bootstrap';
import axios from 'axios';
import QuestionAdd from './Question_Add'

class QuestionManage extends Component {
    constructor() {
        super();
        this.state={
            totalQuestion: [],
            editQuestion: [],
            check:1
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

    componentDidMount(){
      console.log("asas");

    }

    onClickDeleteTotalQuestion(cell, row, rowIndex, totalQuestion) {
        axios.get(`http://172.24.125.116:8000/api/question/${totalQuestion._id}/option`).then(res => {
            for (let index of res.data) {
                axios.delete(`http://172.24.125.116:8000/api/question/${totalQuestion._id}/option/${index._id}`);
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

    onClickEditQuestion(cell, row, index){
        this.setState({editQuestion:this.state.totalQuestion[index]});
        localStorage.setItem("_id", this.state.totalQuestion[index]._id);
        this.setState({check:0})
    }

    deleteButton(cell, row, enumObject, rowIndex) {
        return ( <Button onClick={
                () => this.onClickDeleteTotalQuestion(cell, row, rowIndex, this.state.totalQuestion[rowIndex])}>
                 Delete {rowIndex + 1} </Button>
               )
    }

    editButton(cell, row, enumObject, rowIndex) {
        return ( <Button onClick={
                () => this.onClickEditQuestion(cell, row, rowIndex)}>
                 Edit {rowIndex + 1} </Button>
               )
    }

 render() {

   if(this.state.check)
   {
   return (
     <div>
     <Jumbotron>
         <Col xsOffset={5}>
         <h2>List Question</h2>
         </Col>
         <Col xsOffset={0}>
             <Link to="/question/add"> <Button bsStyle ="success"  bsSize="large">AddQuestion</Button></Link>
             <Link to="/"> <Button id="space" bsSize="large">Back</Button></Link>
          </Col>
     </Jumbotron>

     <BootstrapTable data={this.state.totalQuestion}>
       <TableHeaderColumn dataField='question' filter={ { type: 'TextFilter', delay: 1000 } } isKey dataSort>
           Question
       </TableHeaderColumn>
       <TableHeaderColumn dataField='start_date' filter={ { type: 'DateFilter', delay: 1000 } } dataSort>
           Start-date
       </TableHeaderColumn>
       <TableHeaderColumn dataField='end_date' filter={ { type: 'DateFilter', delay: 1000 } } dataSort>
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
   </div>
    );
  }
return (
   <QuestionAdd  edit={this.state.editQuestion} check={this.state.check}/>
 );
 }
}




export default QuestionManage;
