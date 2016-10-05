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

//get a person given an ID
function getPerson(id){
	for (i = 0; i < people.length; i++){
		if(id == people[i].loginID){
			return people[i];
		}
	}

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
	res.json({"person" : getPerson(req.params)});
});

//the full name (i.e., first & last) for the person with the given ID
app.get('/person/:loginID/name', function(req, res) {

});


//the seniority (i.e., number of years with the organization) of the person with the given ID
app.get('/person/:loginID/years', function(req, res) {


});


