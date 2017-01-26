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
      <li>  Upload the layout (ideogram) data first - no tracks will
        be rendered without it.
      </li>
      <li>
        The layout data should look like the following image and be a comma
        separated document. The layout file is the only file that MUST have specific
        headers. The headers are as follows: "len", "color", "label", and "id".
      </li>
      <li>
        <img src="../test_data/sample_layout.png"></img>
      </li>
      <li>
        After that, feel free to add as many tracks as you would like. Each track's data
        must have a column that aligns with the id from the layout, a start and end position
        that falls within the range of 0 to the len of the layout piece, and a value. See the
        following image for a better idea of what the data should look like. Column headers
        are required, but they do not need to match the sample data.
      </li>
      <li>
        <img src="../test_data/sample_data.png"></img>
      </li>
    </ul>
  </div>
);

export default Instructions;
