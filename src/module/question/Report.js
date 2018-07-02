import React, {
  Component
}
from 'react';
import {
  Col,
  Button
}
from 'react-bootstrap';
import {
  Link
}
from 'react-router-dom';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';


class Report extends Component {

  constructor() {
    super();
    this.state = {
      option: [],
      optionCount: [],
      row:null
    }
  }

  componentWillMount() {
    const option=[];
    const optionCount=[];
    var flag = 0;
    axios.get(`http://172.24.125.116:8000/api/question/${this.props.row}/option`)
      .then(res => {
        for (var i of res.data) {
          for (var j of this.props.options) {
            if (i._id === j._id) {
              option.push(j.option);
              optionCount.push(j.count);
              flag = 0;
              break;
            } else {
              flag = 1;
            }
          }
          if (flag) {
            option.push(i.option);
            optionCount.push({count:0});
          }
        }
      });
    this.setState({option:option,optionCount:optionCount});
    localStorage.removeItem("rowId");
    localStorage.removeItem("options");
  }


  render() {
      return (
        <div className="Report">
        <Bar
          data={ {
            labels: this.state.option,
            datasets: [
              {
                label: 'Voting Detail',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: this.state.optionCount
              }
            ]
          } }
          width={50}
          height={500}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }} />
          <Col xsOffset={5}>
            <Link to="/"> <Button bsSize="large">Back</Button></Link>
          </Col>
        </div>
      );
    }
}


export default Report;
