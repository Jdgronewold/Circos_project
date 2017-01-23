## Custom Circos visualization

### Background 

Network visualization is an incredible tool for visualizing data from any number of different fields of research. [Circos plots][circos] are a recent addition to the visualization world. Originally created by Martin Krzywinski, circos plots attempt to provide order and direction to relational data. While circos plots are simple to understand, the ability to create them is not intuitive and requires at the very least a working knowledge of R. This project aims to fix that by providing users the ability to upload their data in a specified format and create beautiful, easy to understand plots. Finally, the user should be able to download production quality images of their desired network.

### Functionality & MVP  

With this network builder users will be able to:

- [ ] Upload data sets as .csv files. 
- [ ] Create a circos plot with all the standard tracks
- [ ] Selectively edit and apply rules to change how data is visualized
- [ ] Download the finalized image

In addition, this project will include:

- [ ] A production Readme
- [ ] A modal that demonstrates the correct data format

### Wireframes

This app will consist of a single screen with an upload button as well as the options to edit (i.e. change weight, color, and location of tracks in the circos). The majority of the page will be taken up by the circos visualization.
![wireframes](./wireframe_js.eps)

### Architecture and Technologies


This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic,
- D3 for the actual visualization and interaction of the data, specifically the circos.js library  
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

**TODO**

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and upload figured out.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file.  Learn the basics of `D3` and circos.js.  Goals for the day:

- Get a green bundle with `webpack`
- Successfully be able to upload data

**Day 2**: Dedicate this day to learning the `D3` API.  I would like to be able to build a non-interactive circos plot from user data. It should be rendered on the page. The user should then be able to download the image. Goals for the day: 
 
- Render basic hive plot
- Download hive plot 

**Day 3**: Add interactivity to the circos plot.  Build out modal that instructs users who to properly format the .csv files. Goals for the day:

- Allow user to hover over a circos track/data point and see it's information.
- Allow users to change the color and weight of tracks via rules.
- Have an example modal pop up to show the correctly formatted data


**Day 4**: Add further filtering options. The tool should allow the user to set a max/min range for tracks and apply selective rules. Style the frontend, making it polished and professional.  Goals for the day:

- Create controls node/axis/link manipulation. 
- Have a polished project.


### Bonus features

There are many directions this network visualization to go.  Some anticipated updates are:

- [ ] Add the ability to toggle between instances of the circos
- [ ] Further circos plot manipulation (click and drag tracks to desired location). 

[circos][http://circos.ca/]
