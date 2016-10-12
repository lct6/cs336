//Lisa Terwilliger
//Lab06 

/*
Exercise 6.1:

Identify the request methods that you can and can’t test using the two tools listed above. If a method cannot be testing using a particular tool, explain why this is the case. List the Curl commands you used successfully.
	Can only test get in the browser. Can test all with curl.

What is the most appropriate HTTP response code for pages that aren’t defined by an Express route?
	404, although I could see 400 fitting as well.

Exercise 6.2:
What HTTP methods do forms support?
	post: Corresponds to the HTTP POST method ; form data are included in the body of the form and sent to the server.
	get: Corresponds to the HTTP GET method; form data are appended to the action attribute URI with a '?' as separator, 
		 and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.

How is the form data being passed back to the server and what syntactic form does it take? Is the data modified in any way?
	the server will receive the data as a list of 3 key/value items embodied in the HTTP request
	The data is being modified into json format by the body parser
*/

var express = require('express');
var app = express();
var HttpStatus = require('http-status-codes');
const bodyParser = require('body-parser')
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//GET
app.get('/request', function (req, res) {
	res
	.status(HttpStatus.OK)
  	.send('Hello GET request!');
});

//POST
app.post('/request', function (req, res) {
  res
  .status(HttpStatus.OK)
  .send('Got a POST request' + "  " + req.body.arg + "\n");
});

//POST Exersice 6.2
app.post('/forms', function (req, res) {
  res
  .status(HttpStatus.OK)
  .send('Name: ' + "  " + req.body.user_name + '<br>' +
  		'Email: ' + "  " + req.body.user_email + "<br>" +
  		'Message: ' + "  " + req.body.user_message + "<br>"
  			);
});

//PUT
app.put('/request', function (req, res) {
  res
  .status(HttpStatus.OK)
  .send('Got a PUT request at /request' + "  " + req.body.arg + "\n");
});

//DELETE
app.delete('/request', function (req, res) {
  res
  .status(HttpStatus.OK)
  .send('Got a DELETE request at /request');
});

app.all("*", function (req, res) {
	res
	.status(HttpStatus.BAD_REQUEST)
    .send({
        error: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



/* Curl commands:
lct6@augusta:~/cs336/lab06$ curl --head http://localhost:3000/request
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 18
ETag: W/"12-erbYB1DVxDCB7soy85Dong"
Date: Wed, 12 Oct 2016 16:51:11 GMT
Connection: keep-alive


lct6@augusta:~/cs336/lab06$ curl -X POST localhost:3000/request/ -d '{"arg": "value"}' -H 'Content-Type: application/json'
Got a POST request  value



lct6@augusta:~/cs336/lab06$ curl -X PUT localhost:3000/request/ -d '{"arg": "value"}' -H 'Content-Type: application/json'
Got a PUT request at /request  value



lct6@augusta:~/cs336/lab06$ curl -X DELETE http://localhost:3000/request -d "{"arg": "value"}" -H 'Content-Type: application/json'
Got a DELETE request at /request




*/