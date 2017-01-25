const Papa = require('papaparse');
const Circos = require('./tracks/circos');


  export const loadLayout = () => {

    if ( ! window.FileReader ) {
      return alert( 'FileReader API is not supported by your browser.' );
    }
    let $i = $('#layout-file'), // Put file input ID here
    input = $i[0]; // Getting the element from jQuery
    if ( input.files && input.files[0] ) {
      let file = input.files[0]; // The file
      let fr = new FileReader(); // FileReader instance
      fr.onload = () => {
        // Do stuff on onload, use fr.result for contents of file
        $( '#file-content' ).append( $( '<li id="layout"></li>' ).html( fr.result ) );
        $('#file-content li:last-child').data("type", `layout`);
      };
      fr.readAsText( file );
      // fr.readAsDataURL( file );
    } else {
      // Handle errors here
      alert( "File not selected or browser incompatible." );
    }
  };

  export const loadData = (trackName) => {
    if ( ! window.FileReader ) {
      return alert( 'FileReader API is not supported by your browser.' );
    }
    let $i = $('#data-file'), // Put file input ID here
    input = $i[0]; // Getting the element from jQuery
    if ( input.files && input.files[0] ) {
      let file = input.files[0]; // The file
      let fr = new FileReader(); // FileReader instance
      fr.onload = () => {
        // Do stuff on onload, use fr.result for contents of file
        $( '#file-content' ).append( $( `<li id=${trackName}></li>` ).html( fr.result ) );
      };
      fr.readAsText( file );
      // fr.readAsDataURL( file );
    } else {
      // Handle errors here
      alert( "File not selected or browser incompatible." );
    }
  };

  export const parseLayout = ($obj, configObj) => {

    const data = Papa.parse($obj.html(), {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        console.log(results);
        const circos = new Circos(results.data, configObj);
        const instance = circos.buildInstance();
        debugger
        window.instance = instance;
        instance.render();
      }
    });
  };

  export const parseData = ($obj, configObj) => {

    const data = Papa.parse($obj.html(), {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        console.log(results);
        const circos = new Circos(results.data, configObj);
        const instance = circos.buildInstance();
        debugger
        window.instance = instance;
        instance.render();
      }
    });
  };
