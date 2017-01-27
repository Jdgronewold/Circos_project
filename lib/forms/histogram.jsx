import React from 'react';
import { objectify } from '../js/utils';
import { bindAll, merge, omit } from 'lodash';
import Papa from 'papaparse';
import { bacheloretteData, bachelorData } from '../../test_data/data';

class HistogramForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.resetState();
    this.trackName = '';
    this.fileText = '';
    bindAll(this,
      'resetState', 'loadData',
      'parseData', 'update',
      'handleSubmit', 'renderHistogramForm',
      'removeStateKey', 'getID',
      'handleDelete', 'handleDemo'
    );
  }

  resetState() {
    return ({
      trackName: '',
      deleteTrack: '',
      innerRadius: 100,
      outerRadius: 120,
      min: 'smart',
      max: 'smart',
      colorPalette: 'YlGnBu',
      colorPaletteSize: 9,
      direction: 'out'
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
        this.props.circos.histogram(trackName, config, data);
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

  handleDelete() {
    const track = this.state.deleteTrack;
    this.setState(this.resetState());
    this.props.circos.removeTracks(track);
    this.props.updateFromChild("circos", this.props.circos);
  }

  handleDemo() {
    const config1 = objectify(this.state);
    const config2 = objectify(this.state);
    delete config1['trackName'];
    delete config2['trackName'];
    let trackName1 = 'bachelor-views';
    let trackName2 = 'bachelorette-views';
    const toolTip1 = (d) => (
      `Dates: ${d.start} to ${d.end},
      value: ${d.value},
      track name = ${trackName1}`
    );
    const toolTip2 = (d) => (
      `Dates: ${d.start} to ${d.end},
      value: ${d.value},
      track name = ${trackName2}`
    );
    config1['tooltipContent'] = toolTip1;
    config1.innerRadius = 80;
    config1.outerRadius = 130;
    config2['tooltipContent'] = toolTip2;
    config2.innerRadius = 140;
    config2.outerRadius = 190;
    this.props.circos
      .histogram(trackName1, config1, bachelorData)
      .histogram(trackName2, config2, bacheloretteData);
    this.props.updateFromChild("circos", this.props.circos);
  }


  renderHistogramForm() {
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
        <input
          type='button'
          id='demo-button'
          value="Demo"
          onClick={this.handleDemo}/>
          <div className="form-div">
            <h3>Histogram Configuration</h3>
            <form id="histogram-form">
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
              <div className="form-option">
                <label htmlFor="direction">Direction</label>
                <input
                  type="text"
                  name="direction"
                  value={this.state.direction}
                  onChange={this.update("dirrection")}/>
              </div>
            </form>
          </div>
      </div>
    );
  }

  render() {

    return (
      <div className="histogram">
        { this.renderHistogramForm() }
        <button id="submit-histogram" onClick={this.handleSubmit}>Submit Track</button>
          <div className="delete-track">
            <input
              type="text"
              value={this.state.deleteTrack}
              onChange={this.update("deleteTrack")}
              placeholder="Track name to delete"/>
            <button onClick={this.handleDelete}> Delete Track</button>
          </div>
      </div>
    );
  }

}

export default HistogramForm;
