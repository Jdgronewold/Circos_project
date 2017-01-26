import React from 'react';
import ReactDOM from 'react-dom';

import LayoutForm from './forms/layout';


class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: 'layout',
      circos: {}
    };

    this.updateFromChild = this.updateFromChild.bind(this);
  }

  componentDidUpdate() {
    debugger
    if(Object.keys(this.state.circos)) {

    }

  }


  updateFromChild(key, value) {
    this.setState({[key]: value});
  }



  render() {
    return(
    <div>
      <div className="main-container">
        <svg id="chart"></svg>
      </div>
      <div className="form-container">
        <LayoutForm updateFromChild={this.updateFromChild}/>
      </div>
    </div>
  );
  }
}





document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root/>, document.getElementById('main'));
});
