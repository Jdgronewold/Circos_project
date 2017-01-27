import React from 'react';
import { objectify } from '../js/utils';
import { bindAll, merge, omit } from 'lodash';
import Papa from 'papaparse';

class HeatmapForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.resetState();
    this.fileText = '';
    bindAll(this,
      'resetState', 'loadData',
      'parseData', 'update',
      'handleSubmit', 'renderHeatmapForm',
      'removeStateKey', 'getID'
    );
  }

  resetState() {
    return ({
      trackName: '',
      innerRadius: 100,
      outerRadius: 120,
      min: 'smart',
      max: 'smart',
      colorPalette: 'YlGnBu',
      colorPaletteSize: 9
    });
  }

  loadData(e) {
    $('#loaded').toggle();
    e.preventDefault();
    if ( ! window.FileReader ) {
      return alert( 'FileReader API is not supported by your browser.' );
    }
    let $i = $('#choose-file'), // Put file input ID here
    input = $i[0];
     // Getting the element from jQuery
    if ( input.files && input.files[0] ) {
      let file = input.files[0]; // The file
      let fr = new FileReader(); // FileReader instance
      fr.onload = () => {
        // Do stuff on onload, use fr.result for contents of file
        this.fileText = fr.result;
      };
      fr.readAsText( file );
      // fr.readAsDataURL( file );
    } else {
      // Handle errors here
      alert( "File not selected or browser incompatible." );
    }
  }

  removeStateKey(key) {
    const newState = merge({}, this.state);
    newState[key] = null;
    this.setState({newState});
  }

  getID(obj) {
    const newObj = merge({}, obj);
    const leftOver = omit(newObj, ['start', 'end', 'value']);
    return Object.keys(leftOver)[0];
  }
  parseData(text) {
    Papa.parse(text, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const config = objectify(this.state);
        delete config['trackName'];
        const label = this.getID(results.data[0]);
        const toolTip = (d) => (
          `start: ${d.start} to ${d.end},
          value: ${d.value},
          track name = ${trackName}`
        );
        config['tooltipContent'] = toolTip;
        const data = results.data.map((rowObj, idx) => {
          return Object.values(rowObj);
        });
        const trackName = this.state.trackName;
        // this.removeStateKey('trackName');
        this.props.circos.heatmap(trackName, config, data);
        this.setState(this.resetState());
        this.props.updateFromChild("circos", this.props.circos);
      }
    });
  }

  update(property) {
    return (e) => {
      this.setState({[property]: e.currentTarget.value});
    };
  }

  handleSubmit(){
    $('#loaded').toggle();
    this.parseData(this.fileText);
  }

  renderHeatmapForm() {
    return (
      <div className="forms-container">
        <div className='file-options'>
          <input type="file" id="choose-file" />
          <input
            type='button'
            id='load-layout'
            value='Load'
            onClick={this.loadData}/>
        </div>
        <span id="loaded">Loaded!</span>
        <input
          type="text"
          value={this.state.trackName}
          onChange={this.update("trackName")}
          placeholder="Track name (required)"/>
          <div className="form-div">
            <h3>Heatmap Configuration</h3>
            <form id="heatmap-form">
              <div className="form-option">
                <label htmlFor="innerRadius">Inner Radius</label>
                <input
                  type="number"
                  name="innerRadius"
                  value={this.state.innerRadius}
                  onChange={this.update("innerRadius")}/>
              </div>
              <br/>
              <div className="form-option">
                <label htmlFor="outerRadius">Outer Radius</label>
                <input
                  type="number"
                  name="outerRadius"
                  value={this.state.outerRadius}
                  onChange={this.update("outerRadius")}/>
              </div>
              <div className="form-option">
                <label htmlFor="min">Minimum Value</label>
                <input
                  type="text"
                  name="min"
                  value={this.state.min}
                  onChange={this.update("min")}/>
              </div>
              <div className="form-option">
                <label htmlFor="max">Maximum Value</label>
                <input
                  type="text"
                  name="max"
                  value={this.state.max}
                  onChange={this.update("max")}/>
              </div>
              <div className="form-option">
                <label htmlFor="colorPalette">Color Palette</label>
                <input
                  type="text"
                  name="colorPalette"
                  value={this.state.colorPalette}
                  onChange={this.update("colorPalette")}/>
              </div>
              <div className="form-option">
                <label htmlFor="colorPaletteSize">Color Palette Size</label>
                <input
                  type="number"
                  name="colorPaletteSize"
                  value={this.state.colorPaletteSize}
                  onChange={this.update("colorPaletteSize")}/>
              </div>
            </form>
          </div>
      </div>
    );
  }

  render(){
    return (
      <div className="heatmap">
        {this.renderHeatmapForm()}
        <button id="submit-heatmap" onClick={this.handleSubmit}>Submit Track</button>
      </div>
    );
  }
}

export default HeatmapForm;
