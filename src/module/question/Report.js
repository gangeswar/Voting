import React, {
  Component
}
from 'react';
import {
  Jumbotron,
  Col,
  Row,
  Button,
  Alert,
  Grid
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
import config from '../config.json';


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
    const optionName=[];
    const optionCount=[];
    const option=[];
    var flag = 0;
    axios.get(`${config.url.question}/${this.props.row}/option`)
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

  render() {
      const currentDate = new Date();
      const dateParts = this.props.endDate.split("/");
      const endDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
      var percentage;
      percentage = this.state.optionDetail.map(value =>
        {
          return(
            <Progress key={value._id} circularProgress={value.percentage}/>
          );
        });
      return (
        <div className="Report">
          <Jumbotron>
            <Col xsOffset={2} smOffset={4} >
              <h1>Question Report</h1>
            </Col>
          </Jumbotron>
          <Grid bsClass="container">
          <Row>
            {
              (endDate<currentDate)?
                  <Alert bsStyle="warning">
                    <Col xsOffset={4} smOffset={5} >
                      <strong>This question expired!</strong>
                    </Col>
                  </Alert>
              :null
            }
            <Col sm={6} smOffset={0}>
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
            </Col>
            <Col sm={6} >
            <Bar
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
              </Col>
              </Row>
            </Grid>
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
