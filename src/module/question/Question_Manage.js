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
import axios from 'axios';


class QuestionManage extends Component {
    constructor() {
        super();
        this.state={
            totalQuestion: []
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

    cellButton(cell, row, enumObject, rowIndex) {
        return ( <
            Button onClick={
                () => this.onClickDeleteTotalQuestion(cell, row, rowIndex, this.state.totalQuestion[rowIndex])
            } > Delete {
                rowIndex + 1
            } < /Button>
        )
    }

 render() {

   return (
     <BootstrapTable data={this.state.totalQuestion}>
       <TableHeaderColumn dataField='question' isKey>
           Question
       </TableHeaderColumn>
       <TableHeaderColumn dataField='start_date'>
           Start-date
       </TableHeaderColumn>
       <TableHeaderColumn dataField='end_date'>
           End-date
       </TableHeaderColumn>
       <TableHeaderColumn
           dataField='button'
           dataFormat={this.cellButton.bind(this)}>
           Button
       </TableHeaderColumn>
   </BootstrapTable>
 );

 }
}




export default QuestionManage;
