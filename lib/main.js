

document.addEventListener("DOMContentLoaded", () => {
    // load up svg object that circos is going to take

    $( '#load-file' ).click( function () {
      if ( ! window.FileReader ) {
        return alert( 'FileReader API is not supported by your browser.' );
      }
      let $i = $('#file'), // Put file input ID here
      input = $i[0]; // Getting the element from jQuery
      if ( input.files && input.files[0] ) {
        let file = input.files[0]; // The file
        let fr = new FileReader(); // FileReader instance
        fr.onload = function () {
          // Do stuff on onload, use fr.result for contents of file
          $( '#file-content' ).append( $( '<div/>' ).html( fr.result ) );
        };
        //fr.readAsText( file );
        fr.readAsDataURL( file );
      } else {
        // Handle errors here
        alert( "File not selected or browser incompatible." );
      }
    });
});
