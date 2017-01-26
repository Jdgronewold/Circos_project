import React from 'react';
import { objectify } from '../js/utils';
import { bindAll, merge } from 'lodash';
import Papa from 'papaparse';

class ScatterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.resetState();
    this.trackName = '';
    this.fileText = '';
    bindAll(this,
      'resetState', 'loadData',
      'parseData', 'update',
      'handleSubmit', 'renderScatterForm',
      'removeStateKey'
    );
    }

    resetState() {
      return ({
        trackName: '',
        innerRadius: 100,
        outerRadius: 120,
        min: 'smart',
        max: 'smart',
        direction: 'out',
        glyph: {
          color: '#fd6a62',
          fill: true,
          size: 10,
          shape: 'circle',
          strokeColor: '#d3d3d3',
          strokeWidth: 2
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

    removeStateKey(key) {
      const newState = merge({}, this.state);
      newState[key] = null;
      this.setState({newState});
    }

    parseData(text) {
      Papa.parse(text, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          console.log(results);
          const config = objectify(this.state);
          delete config['trackName'];
          console.log(this.props.circos);
          const data = results.data.map((rowObj, idx) => {
            return Object.values(rowObj);
          });
          const trackName = this.state.trackName;
          // this.removeStateKey('trackName');
          this.props.circos.scatter(trackName, config, data);
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

    updateNested(property1, property2) {
      return (e) => {
        const temp = this.state[property1];
        const newSlice = merge(temp, {[property2]: e.currentTarget.value});
        this.setState({[property1]: newSlice});
      };
    }

    handleSubmit(){
      $('#loaded').toggle();
      this.parseData(this.fileText);
    }

    renderScatterForm() {
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
            <input
              type="text"
              value={this.state.trackName}
              onChange={this.update("trackName")}/>
            <div className="form-div">
              <h3>Scatter Configuration</h3>
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
                  <label htmlFor="direction">Direction</label>
                  <input
                    type="text"
                    name="direction"
                    value={this.state.direction}
                    onChange={this.update("dirrection")}/>
                </div>
                <div className="form-option">
                  <label htmlFor="color">Glyph Color</label>
                  <input
                    type="text"
                    name="color"
                    value={this.state.glyph.color}
                    onChange={this.updateNested('glyph', 'color')}/>
                </div>
                <fieldset id="display1">
                  <label> Fill Glyph
                    <input
                      type="radio"
                      name="display1"
                      value={true}
                      onChange={this.updateNested('glyph', 'fill')}/>
                  </label>
                  <label> Don't Fill Glyph
                    <input
                      type="radio"
                      name="display1"
                      value={false}
                      onChange={this.updateNested('glyph', 'fill')}/>
                  </label>
                </fieldset>
                <div className="form-option">
                  <label htmlFor="size">Glyph Size</label>
                  <input
                    type="number"
                    name="size"
                    value={this.state.glyph.size}
                    onChange={this.updateNested('glyph', 'size')}/>
                </div>
                <div className="form-option">
                  <label htmlFor="shape">Glyph Shape</label>
                  <select
                    name="shape"
                    value={this.state.glyph.shape}
                    onChange={this.updateNested('glyph', 'shape')}>
                    <option value="circle">Cirlce</option>
                    <option value="triangle up">Triangle Up</option>
                    <option value="triangle down">Triangle Down</option>
                    <option value="square">Square</option>
                    <option value="rhombus">Rhombus</option>
                  </select>
                </div>
                <div className="form-option">
                  <label htmlFor="strokeColor">Glyph Stroke Color</label>
                  <input
                    type="text"
                    name="strokeColor"
                    value={this.state.glyph.strokeColor}
                    onChange={this.updateNested('glyph', 'strokeColor')}/>
                </div>
                <div className="form-option">
                  <label htmlFor="strokeWidth">Glyph Stroke Width</label>
                  <input
                    type="number"
                    name="strokeWidth"
                    value={this.state.glyph.strokeWidth}
                    onChange={this.updateNested('glyph', 'strokeWidth')}/>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }


    render(){
      return (
        <div className="scatter">
          {this.renderScatterForm()}
          <button id="submit-scatter" onClick={this.handleSubmit}>Submit Track</button>
        </div>
      );
    }
  }

  export default ScatterForm;
