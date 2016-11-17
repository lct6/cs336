$(document).ready(function() {
$( 'form' ).submit(function( event ) {
  event.preventDefault();

  var form = $( this );
//from Sending data & working with forms
  $.ajax({
    type: 'GET',
    url: '/getID',
    data: form.serialize(),
    dataType: 'json',
    success: function( resp ) {
      console.log( resp );
    }
  })

//add info to the DOM
.done(function( result ) {
          console.log('AJAX request succeeded...');
          $("body").append("<p>First name: " + result.firstName + "</p>");
          $("body").append("<p>Last name: " + result.lastName + "</p>");
          $("body").append("<p>ID: " + result.ID + "</p>");
          $("body").append("<p>Start date: " + result.startDate + "</p>");

    })
  });
});