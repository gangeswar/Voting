import React, {
  Component
}
from 'react';

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
    localStorage.removeItem("value");
  }


  render() {
      return (
        <div className="Report">
          {this.props.row}
        </div>
      );
    }
}


export default Report;
