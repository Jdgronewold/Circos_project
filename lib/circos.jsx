import React from 'react';
import ReactDOM from 'react-dom';

import LayoutForm from './forms/layout';
import HeatmapForm from './forms/heatmap';
import HistogramForm from './forms/histogram';
import ScatterForm from './forms/scatter';


class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: 'layout',
      circos: {}
    };

    this.updateFromChild = this.updateFromChild.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  componentDidUpdate() {
    debugger
    if(Object.keys(this.state.circos).length > 0) {
      this.state.circos.render();
    }
  }

  handleSelect(e) {
    e.preventDefault();
    this.setState({form: e.currentTarget.value});
  }

  updateFromChild(key, value) {
    this.setState({[key]: value});
  }

  renderForm() {
    switch(this.state.form) {
      case "layout":
        return (
          <LayoutForm updateFromChild={this.updateFromChild}/>
        );
      case "heatmap":
        return (
          <HeatmapForm
            updateFromChild={this.updateFromChild}
            circos={this.state.circos}/>
        );
      case "histogram":
      return (
        <HistogramForm
          updateFromChild={this.updateFromChild}
          circos={this.state.circos}/>
      );
      case "scatter":
      return (
        <ScatterForm
          updateFromChild={this.updateFromChild}
          circos={this.state.circos}/>
      );
      default:
        return (
          <div></div>
        );
    }
  }


  render() {
    return(
    <div className="main-container">
      <div className="circos-container">
        <div className="form-options">
          <select value={this.state.form} onChange={this.handleSelect}>
            <option value="layout">Layout</option>
            <option value="heatmap">Heatmap</option>
            <option value="histogram">Histogram</option>
            <option value="scatter">Scatter</option>
          </select>
        </div>
        <div className="svg-container">
          <svg id="chart"></svg>
        </div>
      </div>
      <div className="form-container">
        {this.renderForm()}
      </div>
    </div>
  );
  }
}



document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root/>, document.getElementById('main'));
});
