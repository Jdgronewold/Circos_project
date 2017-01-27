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
      'parseData', 'handleSubmit',
      'renderDemoData', 'handleDemo'
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
    e.preventDefault();
    if ( ! window.FileReader ) {
      return alert( 'FileReader API is not supported by your browser.' );
    }
    let $i = $('#choose-file'), // Put file input ID here
    input = $i[0];
     // Getting the element from jQuery
    if ( input.files && input.files[0] ) {
      $('#loaded').toggle();
      let file = input.files[0]; // The file
      let fr = new FileReader(); // FileReader instance
      fr.onload = () => {
        // Do stuff on onload, use fr.result for contents of file
        debugger
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
    debugger
    Papa.parse(text, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const fixedState = objectify(this.state);
        const circosObj = new Circos(results.data, fixedState);
        const circosInstance = circosObj.buildInstance();
        debugger
        this.props.updateFromChild("circos", circosInstance);
      }
    });
  }

  handleSubmit(){
    if ( this.fileText.length > 0 ) {
      $('#loaded').toggle();
      this.parseData(this.fileText);
    } else {
      alert( "File not selected or browser incompatible." );
    }
  }

  handleDemo() {
    $('#loaded').toggle();
    this.fileText = 'test_data/test_layout.csv'
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
            type='button'
            id='demo-button'
            value="Demo"
            onClick={this.handleDemo}/>
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
    );
  }

  renderDemoData() {
    const string = "len,color,label,id30,#8dd3c7,january,january30,#ffffb3,february,february30,#bebada,march,march30,#fb8072,april,april30,#80b1d3,may,may30,#fdb462,june,june30,#b3de69,july,july30,#fccde5,august,august30,#d9d9d9,september,september30,#bc80bd,october,october30,#ccebc5,november,november30,#ffed6f,december,december";
    return (
      <div id="demo-data">{string}</div>
    );
  }

  renderLabelsForm() {
    return (
      <div className="form-div">
        <h4>Ideogram Labels</h4>
        <form id="labels-form">
          <div className="form-option-radio">
            {this.renderDemoData()}
            <fieldset id="display1">
              <label> Labels
                <input
                  type="radio"
                  name="display1"
                  value={true}
                  onChange={this.updateNested('labels', 'display')}/>
              </label>
              <label> No Labels
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
              <label> Ticks
                <input
                  type="radio"
                  name="display1"
                  value={true}
                  onChange={this.updateNested('ticks', 'display')}/>
              </label>
              <label> No Ticks
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
              <label> Tick Labels
                <input
                  type="radio"
                  name="display2"
                  value={true}
                  onChange={this.updateNested('ticks', 'labels')}/>
              </label>
              <label> No Tick Labels
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
        <button id="submit-layout" onClick={this.handleSubmit}>Submit Layout</button>
      </div>
    );
  }

  render() {
    return (
      <div className="layout">
        { this.renderLayoutForm() }
        { this.renderLabelsForm() }
        { this.renderTicksForm() }
      </div>
    );
  }
}

export default LayoutForm;
