//Lisa Terwilliger
//Homework 1

var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
   res.json({"message" : "Hello World"});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


function person(firstName, lastName, loginID, startDate) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.loginID = loginID;
	this.startDate = new Date(startDate);
	this.fullName = firstName + " " + lastName;
}

var Jane = new person("Jane", "Doe", "jd123", "1975/05/06");
var Ken = new person("Ken", "Doe", "kd456", "1973/07/21");

var people = [Jane, Ken];

function printPerson(person){
	var mes = person.firstName + " " + person.lastName + ", ID: " + person.loginID + 
				", started on: " + person.startDate;
	return mes;
}

//years function
function getYears(person) {
    var today = new Date();
    var startDate = new Date(person.startDate);
    var years = today.getFullYear() - startDate.getFullYear();
    var m = today.getMonth() - startDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) {
        years--;
    }
    return years;
}

//a list of all people objects
app.get('/people', function(req, res) {
  res.json({"people" : people});
});

//the full record for the person with the given ID
app.get('/person/:loginID', function(req, res) {
	if(req.params.loginID == "jd123"){
		res.json({"Person" : printPerson(Jane) });
	}
	else if(req.params.loginID == "kd456"){
		res.json({"Person" : printPerson(Ken) });
	} else {
		res.sendStatus(404);
	}
});

//the full name (i.e., first & last) for the person with the given ID
app.get('/person/:loginID/name', function(req, res) {
  	if(req.params.loginID == "jd123"){
		res.json({"Name" : Jane.fullName});
	}
	else if(req.params.loginID == "kd456"){
		res.json({"Name" : Ken.fullName});
	} else {
		res.sendStatus(404);
	}
});


//the seniority (i.e., number of years with the organization) of the person with the given ID
app.get('/person/:loginID/years', function(req, res) {
  	if(req.params.loginID == "jd123"){
		res.json({"Years" : getYears(Jane) });
	}
	else if(req.params.loginID == "kd456"){
		res.json({"Years" : getYears(Ken) });
	} else {
		res.sendStatus(404);
	}
});


