//Lisa Terwilliger
//Lab07
 
$( document ).ready(function() {

//button widget
$( function() {
    $( "button, input, a" ).click( 
      function( event ) {
        // Using the core $.ajax() method
$.ajax({
 
    // The URL for the request
    url: "/hello",
 
    // The data to send (will be converted to a query string)
    data: {
        name : "lab7"
    },
 
    // Whether this is a POST or GET request
    type: "GET",
 
    // The type of data we expect back
    dataType : "json",
})
  // Code to run if the request succeeds (is done);
  // The response is passed to the function
  .done(function( result ) {
          //console.log('AJAX request succeeded...');
          $("body").append("<p>" + result.message + "</p>");

  })
  // Code to run if the request fails; the raw request and
  // status codes are passed to the function
  .fail(function( xhr, status, errorThrown ) {
    alert( "Sorry, there was a problem!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
  })
  // Code to run regardless of success or failure;
  .always(function( xhr, status ) {
    alert( "The request is complete and this is an annoying pop-up saying so!" );
  });
      //exercise 7.2 
      //event.preventDefault();
      //$( "<p> That was fun!</p>" ).insertAfter( "button" );
    } );
  } );


});
 

