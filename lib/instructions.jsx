import React from 'react';

const Instructions = () => (
  <div className="Instructions">
    <h2>Instructions</h2>
    <span>
      Hello! This app is a tool for creating a &nbsp;
      <a href="http://circos.ca/">Circos</a> image with your own data!
      As a heads up, this app is designed to be used in Chrome. It should work
      in other browsers but the download function is exclusive to Chrome.
    </span>

    <h3> Uploading Data </h3>
    <ul>
      <li>
        <b>Demo Info: </b> To load demo data, edit the form (except the track name) for
          a given track and then hit the Demo button - no need to submit
          the track! The demo automatically loads data from the google search
          trends for the Bachelor and Bachelorette televison shows (because
          everyone needs to know).
      </li>
      <li>
        &nbsp;
      </li>
      <li>  Upload the layout (ideogram) data first - no tracks will
        be rendered without it.
      </li>
      <br></br>
      <li>
        The layout data should look like the following image and be a comma
        separated document. The layout file is the only file that MUST have specific
        headers. The headers are as follows: "len", "color", "label", and "id".
      </li>
      <br></br>
      <li>
        <img src="test_data/sample_layout.png"></img>
      </li>
      <br></br>
      <li>
        After that, feel free to add as many tracks as you would like. Each histogram
        and heatmap track's data must have a column that aligns with the id from the layout,
        a start and end position that falls within the range of 0 to the len of the layout piece,
        and a value. See the following image for a better idea of what the data should look like.
      </li>
      <br></br>
      <li>
        Colors for the heatmap and histogram ranges are sourced from
        &nbsp; <a href="http://colorbrewer2.org/">Color Brewer</a> and follow the
        schemes detailed there.
      </li>
      <br></br>
      <li>
        <img src="test_data/sample_data.png"></img>
      </li>
      <br></br>
      <li>
        Column headers are required, and it is recommended that the headers
        "start", "end", and "value" are used for the interactive tooltips to
        function properly.
      </li>
      <br></br>
      <li>
        Scatter data does not need an "end" column - it simply needs column
        linking each row to a block, a start position, and a value.
      </li>
    </ul>
    <span> Most of the magic is accomplished with &nbsp;
      <a href="https://www.gitbook.com/book/nicgirault/circosjs/details">
        circosJS
      </a>, a d3.js library for illustrating circos plots.</span>
  </div>
);

export default Instructions;
