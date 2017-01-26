import React from 'react';
import { bindAll, merge } from 'lodash';
import Papa from 'papaparse';
import Circos from '../js/circos';
import { objectify, loadData } from '../js/utils';

class LayoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.resetState();

    bindAll(this,
      'resetState', 'update',
      'updateNested', 'loadData',
      'parseData', 'handleSubmit'
    );
    this.fileText = '';
  }

  resetState() {
    return ({
      innerRadius: 200,
      outerRadius: 240,
      labels: {
        display: true,
        color: "#000000",
        radialOffset: 10,
        size: {
          minor: 2,
          major: 5
        }
      },
      ticks: {
        display: true,
        color: "#000000",
        labels: true,
        labelSuffix: 'Mb',
        labelSize: 10,
        spacing: 15
      }
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

  parseData(text) {
    Papa.parse(text, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        console.log(results);
        const fixedState = objectify(this.state);
        const circosObj = new Circos(results.data, fixedState);
        const circosInstance = circosObj.buildInstance();
        this.props.updateFromChild("circos", circosInstance);
      }
    });
  }

  handleSubmit(){
    $('#loaded').toggle();
    this.parseData(this.fileText);
  }

  update(property) {
    return (e) => {
      this.setState({[property]: e.currentTarget.value});
    };
  }

  updateNested(property1, property2) {
    return (e) => {
      const temp = this.state[property1];
      const newSlice = merge(temp, {[property2]: e.currentTarget.value});
      this.setState({[property1]: newSlice});
    };
  }

  renderLayoutForm() {
    return (
      <div className="forms-container">
        <div className="form-tab">
          <input type="file" id="choose-file" />
          <input
            type='button'
            id='load-layout'
            value='Load'
            onClick={this.loadData}/>
          <span id="loaded">Loaded!</span>
          <div className="form-div">
            <h3>Ideogram Configuration</h3>
            <form id="layout-form">
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
            </form>
          </div>
        </div>
      </div>
    );
  }

  renderLabelsForm() {
    return (
      <div className="form-div">
        <h4>Ideogram Labels</h4>
        <form id="labels-form">
          <div className="form-option-radio">
            <fieldset id="display1">
              <label> Display Labels
                <input
                  type="radio"
                  name="display1"
                  value={true}
                  onChange={this.updateNested('labels', 'display')}/>
              </label>
              <label> Don't Display Labels
                <input
                  type="radio"
                  name="display1"
                  value={false}
                  onChange={this.updateNested('labels', 'display')}/>
              </label>
            </fieldset>
          </div>
          <div className="form-option">
            <label htmlFor="color">Label Color</label>
            <input
              type="text"
              name="color"
              value={this.state.labels.color}
              onChange={this.updateNested('labels', 'color')}/>
          </div>
          <div className="form-option">
            <label htmlFor="radialOffset">Radial Offset</label>
            <input
              type="number"
              name="radialOffset"
              value={this.state.labels.radialOffset}
              onChange={this.updateNested('labels', 'radialOffset')}/>
          </div>
          <div className="form-options">
            <label htmlFor="size">Font size</label>
            <input
              type="number"
              name="size" value={12}
              onChange={this.updateNested('labels', 'size')}/>
          </div>
        </form>
      </div>
    );
  }

  renderTicksForm() {
    return (
      <div className="form-div">
        <h4>Ideogram Ticks</h4>
        <form id="ticks-form">
          <div className="form-option-radio">
            <fieldset id="display1">
              <label> Display Ticks
                <input
                  type="radio"
                  name="display1"
                  value={true}
                  onChange={this.updateNested('ticks', 'display')}/>
              </label>
              <label> Don't Display Ticks
                <input
                  type="radio"
                  name="display1"
                  value={false}
                  onChange={this.updateNested('ticks', 'display')}/>
              </label>
            </fieldset>
          </div>
          <div className="form-option">
            <label htmlFor="spacing">Spacing</label>
            <input
              type="number"
              name="spacing"
              value={this.state.ticks.spacing}
              onChange={this.updateNested('ticks','spacing')}/>
          </div>
          <div className="form-option">
            <label htmlFor="color">Tick Color</label>
            <input
              type="text"
              name="color"
              value={this.state.ticks.color}
              onChange={this.updateNested('ticks','color')}/>
          </div>
          <div className="form-option-radio">
            <fieldset id="display2">
              <label> Display Tick Labels
                <input
                  type="radio"
                  name="display2"
                  value={true}
                  onChange={this.updateNested('ticks', 'labels')}/>
              </label>
              <label> Don't Display Ticks
                <input
                  type="radio"
                  name="display2"
                  value={false}
                  onChange={this.updateNested('ticks', 'labels')}/>
              </label>
            </fieldset>
          </div>
          <div className="form-option">
            <label htmlFor="labelSuffix">Label Suffix</label>
            <input
              type="text"
              name="labelSuffix"
              value={this.state.ticks.labelSuffix}
              onChange={this.updateNested('ticks','labelSuffix')}/>
          </div>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="layout">
        { this.renderLayoutForm() }
        { this.renderLabelsForm() }
        { this.renderTicksForm() }
        <button id="submit-layout" onClick={this.handleSubmit}>Submit Layout</button>
      </div>
    );
  }
}

export default LayoutForm;
