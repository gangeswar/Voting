import React, {
  Component
}
from 'react';
import {Bar} from 'react-chartjs-2';


class Report extends Component {

  constructor() {
    super();
    this.state = {
      questions: [],
      row:null
    }
  }

  componentDidMount() {
    console.log(this.props.row);
    console.log(this.props.options);
    localStorage.removeItem("rowId");
    localStorage.removeItem("options");
  }


  render() {
      return (
        <div className="Report">
        <Bar
          data={ {
            labels: [this.props.options[0].option,this.props.options[1].option,this.props.options[2].option,this.props.options[3].option],
            datasets: [
              {
                label: 'Voting Detail',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [this.props.options[0].count,this.props.options[1].count,this.props.options[2].count,this.props.options[3].count]
              }
            ]
          } }
          width={100}
          height={500}
          options={{
            maintainAspectRatio: false
          }} />
        </div>
      );
    }
}


export default Report;
