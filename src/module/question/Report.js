import React, {
  Component
}
from 'react';
import {
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
import CircularProgressbar from 'react-circular-progressbar';
import {Bar} from 'react-chartjs-2';


class Report extends Component {

  constructor() {
    super();
    this.state = {
      option: [],
      optionCount: [],
      optionPercentage: [],
      width:100,
      height:400
    }
  }

  componentWillMount() {
     this.updateDimensions.bind(this);
    const option=[];
    const optionCount=[];
    const Percentage=[];
    var flag = 0;
    axios.get(`http://172.24.125.116:8000/api/question/${this.props.row}/option`)
      .then(res => {
        for (var i of res.data) {
          for (var j of this.props.options) {
            if (i._id === j._id) {
              option.push(j.option);
              optionCount.push(j.count);
              Percentage.push({percentage:j.percentage});
              flag = 0;
              break;
            } else {
              flag = 1;
            }
          }
          if (flag) {
            option.push(i.option);
            optionCount.push(0);
            Percentage.push({percentage:0});
          }
        }
        this.setState(
          {
            optionPercentage:Percentage
          });
      });
    this.setState(
      {
        option:option,
        optionCount:optionCount
      }
    );
    localStorage.removeItem("rowId");
    localStorage.removeItem("options");
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
      percentage = this.state.optionPercentage.map(value =>
        {
          return(
            <Progress key={value._id} circularProgress={value.percentage}/>
          );
        });
      const canStyle = {
         width: this.state.width
       };
      return (
        <div className="Report">
          {
            (endDate<currentDate)?
                <Alert bsStyle="warning">
                  <strong className="right">This question expired!</strong>
                </Alert>
            :null
          }
          <h4><strong>{this.props.question}</strong></h4>
          <div className="center" >
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
            <div className="space">
              {percentage}
            </div>
            <div>
              <Col xsOffset={5}>
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
          <div className="Progress" style={{
              display: 'inline-block',
              position: 'relative',
              margin: '0 auto',
              width:'25%',
              heigth:'25%'
            }}>
            <CircularProgressbar percentage={this.props.circularProgress} text={`${Math.round(this.props.circularProgress)}%`} />
          </div>
      );
    }
}

export default Report;
