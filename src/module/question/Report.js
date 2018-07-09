import React, {
  Component
}
from 'react';
import {
  Jumbotron,
  Col,
  Button,
  Alert
}
from 'react-bootstrap';
import {
  Link
}
from 'react-router-dom';
import axios from 'axios';
import {
  BootstrapTable,
  TableHeaderColumn
}
from 'react-bootstrap-table';
import CircularProgressbar from 'react-circular-progressbar';
import {Bar} from 'react-chartjs-2';


class Report extends Component {

  constructor() {
    super();
    this.state = {
      option: [],
      optionCount: [],
      optionDetail: [],
      width:100,
      height:300
    }
  }

  componentWillMount() {
   this.updateDimensions.bind(this);
    const optionName=[];
    const optionCount=[];
    const option=[];
    var flag = 0;
    axios.get(`http://172.24.125.116:8000/api/question/${this.props.row}/option`)
      .then(res => {
        for (var i of res.data) {
          for (var j of this.props.options) {
            if (i._id === j._id) {
              optionName.push(j.option);
              optionCount.push(j.count);
              option.push({_id:j._id,option:j.option,count:j.count,percentage:Math.round(j.percentage)});
              flag = 0;
              break;
            } else {
              flag = 1;
            }
          }
          if (flag) {
            optionName.push(i.option);
            optionCount.push(0);
            option.push({_id:i._id,option:i.option,count:0,percentage:0});
          }
        }
        this.setState(
          {
            optionDetail:option
          });
      });
    this.setState(
      {
        option:optionName,
        optionCount:optionCount
      }
    );
  }

  updateDimensions(){
     let width = this.refs.div.offsetWidth;
     let height= this.refs.div.offsetHeight;
     this.setState({width:width,height:height});
   }

   componentDidMount(){
      window.addEventListener("resize", this.updateDimensions.bind(this));
   }

  render() {
      const currentDate = new Date();
      const dateParts = this.props.endDate.split("/");
      const endDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
      var percentage;
      percentage = this.state.optionDetail.map(value =>
        {
          return(
            <Progress circularProgress={value.percentage}/>
          );
        });
      const canStyle = {
          height: this.state.heigth,
         width: this.state.width
       };
      return (
        <div className="Report">
          <Jumbotron>
            <Col xsOffset={2} smOffset={4} >
              <h1>Question Report</h1>
            </Col>
          </Jumbotron>
          {
            (endDate<currentDate)?
                <Alert bsStyle="warning">
                  <Col xsOffset={4} smOffset={5} >
                    <strong>This question expired!</strong>
                  </Col>
                </Alert>
            :null
          }

          <div className="report-table">
            <h4><strong>{this.props.question}</strong></h4>
          <BootstrapTable data={ this.state.optionDetail } >
            <TableHeaderColumn dataField='_id' isKey >
              Option Id
            </TableHeaderColumn>
            <TableHeaderColumn dataField='option' filter={ { type: 'TextFilter', delay: 1000 } } dataSort>
              Option
            </TableHeaderColumn>
            <TableHeaderColumn  ref='count' dataField='count'  filter={ { type: 'TextFilter', delay: 1000 } } dataSort>
              User Attended
            </TableHeaderColumn>
            <TableHeaderColumn  ref='percentage' dataField='percentage' dataSort>
              percentage (%)
            </TableHeaderColumn>
          </BootstrapTable>
          <div>
            {percentage}
          </div>
          </div>
          <div className="center-progress" >
          <Bar
            style={canStyle}
            data={ {
              labels: this.state.option,
              datasets: [
                {
                  label: 'Voting Detail',
                  backgroundColor: 'rgba(0,255,255,0.2)',
                  borderColor: 'rgba(0,255,255,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(0,255,255,0.4)',
                  hoverBorderColor: 'rgba(0,255,255,1)',
                  data: this.state.optionCount
                }
              ]
            } }
            width={this.state.width}
    	       height={this.state.height}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }],
                xAxes: [{
                  barPercentage: 0.6
                }]
              }
            }} redraw/>
            </div>

            <div>
              <Col xsOffset={5} smOffset={5}>
                <Link to="/"> <Button bsSize="large">Back</Button></Link>
              </Col>
            </div>
        </div>
      );
    }
}


class Progress extends Component {
    render() {
      return(
          <div className="Progress">
            <CircularProgressbar percentage={this.props.circularProgress} text={`${Math.round(this.props.circularProgress)}%`} />
          </div>
      );
    }
}

export default Report;
