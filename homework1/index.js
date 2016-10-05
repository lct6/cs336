//Lisa Terwilliger
//Homework 1

var express = require('express');
var app = express();

// respond with greeting
app.get('/', function(req, res) {
   res.json("Hello! to look at all people in the organization type /people in the URL");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


function person(firstName, lastName, loginID, startDate) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.fullName = firstName + " " + lastName;
	this.loginID = loginID;
	this.startDate = new Date(startDate);
	
}

//hard code the people
var Jane = new person("Jane", "Doe", "jd123", "1975/05/06");
var Ken = new person("Ken", "Doe", "kd456", "1973/07/21");
var Moe = new person("Moe", "Howard", "mh111", "1997/06/19");
var Curly = new person("Curly", "Howard", "ch222", "2003/10/22");
var Larry = new person("Larry", "Fine", "lf333", "2002/10/05");

//add them to a list
var peopleList = [Jane, Ken, Moe, Curly, Larry];

//get a person given an ID if not found return null
function getPerson(id){
	for (i = 0; i < peopleList.length; i++){
		if(peopleList[i].loginID == id){
			return peopleList[i];
		}
	}

	return null;
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

//Displays a list of all people objects
app.get('/people', function(req, res) {
  res.json(peopleList);
});

//Displays the full record for the person with the given ID
app.get('/person/:loginID', function(req, res) {
	if(getPerson(req.params.loginID) != null){
		res.json(getPerson(req.params.loginID));
	} else{
		res.sendStatus(404);
	}
});

//Displays the full name (i.e., first & last) for the person with the given ID
app.get('/person/:loginID/name', function(req, res) {
	if(getPerson(req.params.loginID) != null){
		res.json(getPerson(req.params.loginID).fullName);
	}else{
		res.sendStatus(404);
	}
});


//Displays the seniority (i.e., number of years with the organization) of the person with the given ID
app.get('/person/:loginID/years', function(req, res) {
	if(getPerson(req.params.loginID) != null){
		res.json(getYears(getPerson(req.params.loginID)));
	} else {
		res.sendStatus(404);
	}

});


