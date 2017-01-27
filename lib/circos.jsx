import React from 'react';
import ReactDOM from 'react-dom';
import { bindAll, merge } from 'lodash';

import LayoutForm from './forms/layout';
import HeatmapForm from './forms/heatmap';
import HistogramForm from './forms/histogram';
import ScatterForm from './forms/scatter';
import Instructions from './instructions';


class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadName: '',
      form: 'layout',
      circos: {}
    };
    bindAll(this,
      'updateFromChild', 'handleSelect',
      'renderForm', 'handleDownloadName',
      'handleDownload', 'handleToggle',
      'handleToggleInstructions'
    );
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

  handleDownloadName(e) {
    this.setState({downloadName: e.currentTarget.value});
  }

  handleDownload(e) {
    const config = {
      filename: this.state.downloadName
    };
    this.setState({downloadName: ""});
    d3_save_svg.save(d3.select('svg').node(), config);
  }

  handleToggle() {
    $('.all-forms').toggle("slide", {direction: "right" }, 600);
  }

  handleToggleInstructions() {
    $('.instruction-container').toggle("slide", {direction: "left" }, 600);
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
      <div className="instruction-container">
        <Instructions />
      </div>
      <div className="circos-container">
        <div className="top-options">
          <div
            className="toggle"
            onClick={this.handleToggleInstructions}>
            <i className="fa fa-book fa-2x" aria-hidden="true"></i>
          </div>
          <div className="download">
            <input
              type="text"
              value={this.state.downloadName}
              onChange={this.handleDownloadName}
              placeholder="Choose file name"/>
            <button id="export" onClick={this.handleDownload}>Download</button>
          </div>
          <div
            className="toggle"
            onClick={this.handleToggle}>
            <i className="fa fa-plus-square fa-2x" aria-hidden="true"></i>
          </div>
        </div>
        <div className="svg-container">
          <svg id="chart"></svg>
        </div>
      </div>
      <div className="all-forms">
        <div className="form-select" name="form-select">
          <label htmlFor="form-select"> Type of track: &nbsp;</label>
          <select value={this.state.form} onChange={this.handleSelect}>
            <option value="layout">Layout</option>
            <option value="heatmap">Heatmap</option>
            <option value="histogram">Histogram</option>
            <option value="scatter">Scatter</option>
          </select>
        </div>
        <div className='form-component'>
          {this.renderForm()}
        </div>
      </div>
    </div>
  );
  }
}



document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root/>, document.getElementById('main'));
});
