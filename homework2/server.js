//Lisa Terwilliger
//Homework 2
/*
    I tried to implement this using a file to store the people like 
    we did in lab 8. This probably ended up being more complemented
    than intended.
*/

var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var HttpStatus = require('http-status-codes');
const bodyParser = require('body-parser')

var COMMENTS_FILE = path.join(__dirname, 'comments.json');
 
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// respond with greeting
app.get('/', function(req, res) {
   res.json("Hello! to look at all people in the organization type /people in the URL");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//person *Homework 1
function person(firstName, lastName, loginID, startDate) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.fullName = firstName + " " + lastName;
	this.loginID = loginID;
	this.startDate = new Date(startDate);
	
}

//hard code the people *Homework 1
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


//years function Updated
function getYears(date) {
    var today = new Date();
    var startDate = date;
    var years = today.getFullYear() - startDate.getFullYear();
    var m = today.getMonth() - startDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) {
        years--;
    }
    return years;
}





//Displays the full name (i.e., first & last) for the person with the given ID
//updated
app.get('/person/:loginID/name', function(req, res) {
	fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var comments = JSON.parse(data);


        var person = null;

        for (i = 0; i < comments.length; i++){
            //console.log(i);
            //console.log(comments[i].loginID);
            
            if(comments[i].loginID == req.params.loginID){
                 person = comments[i];
            }
        }
        //send the info if found otherwise send not found
        if(person != null){
            res.send({firstName: person.firstName, 
                     lastName: person.lastName
            });
        }else{
            res.sendStatus(404);
        }
    });
});


//Displays the seniority (i.e., number of years with the organization) of the person with the given ID
//updated
app.get('/person/:loginID/years', function(req, res) {
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var comments = JSON.parse(data);


        var person = null;

        for (i = 0; i < comments.length; i++){
            //console.log(i);
            //console.log(comments[i].startDate);
            
            if(comments[i].loginID == req.params.loginID){
                 person = comments[i];
            }
        }

    if(person != null){
        stDate = new Date(person.startDate);
        res.json(getYears(stDate));
    } else {
        res.sendStatus(404);
    }
    

    });

});









//Despite this I will probably still wonder where my HW2 code is....
//-----------------------------------------------------------------------------------------------
//***********************************************************************************************
//************************************** FOR HW 2************************************************
//***********************************************************************************************
//-----------------------------------------------------------------------------------------------




//Displays a list of all people objects 
app.get('/people', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


//sends that data to the server to be added to the in-memory database
app.post('/forms', function (req, res) {
 
  fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var comments = JSON.parse(data);
       
        var newComment = {
        	firstName: req.body.user_firstName,
        	lastName: req.body.user_lastName,
            loginID: req.body.user_id,
            startDate: req.body.user_startDate,
        };
        comments.push(newComment);
        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.status(HttpStatus.OK)
            res.send('First Name: ' + "  " + req.body.user_firstName + '<br>' +
  		'Last Name: ' + "  " + req.body.user_lastName + '<br>' +
  		'ID: ' + "  " + req.body.user_id + '<br>' +
  		'Start Date: ' + "  " + req.body.user_startDate + "<br>"
  			);;
        });
    });

});




//Get Person info from id form
app.get('/getID', function (req, res) {

	fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var comments = JSON.parse(data);


        var person = null;

        for (i = 0; i < comments.length; i++){
        	//console.log(i);
        	//console.log(comments[i].loginID);
        	
        	if(comments[i].loginID == req.query.user_id){
        		 person = comments[i];
        	}
        }
        //send the info if found otherwise send not found
        if(person != null){
			res.send({firstName: person.firstName, 
			  		 lastName: person.lastName,
			  		 ID: person.loginID,
			  		 startDate: person.startDate
			});
		}else{
			res.sendStatus(404);
		}
	});
});


//Displays the full record for the person with the given ID 
//*Homework 2 update: This should allow you to get, update or delete person records identified by the given ID.
app.get('/person/:loginID', function(req, res) {
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var comments = JSON.parse(data);
        var person = null;

        for (i = 0; i < comments.length; i++){
            //console.log(i);
            //console.log(comments[i].loginID);
            
            if(comments[i].loginID == req.params.loginID){
                 person = comments[i];
            }
        }
        //send the info if found otherwise send not found
        if(person != null){
            res.send({firstName: person.firstName, 
                     lastName: person.lastName,
                     ID: person.loginID,
                     startDate: person.startDate
            });
        }else{
            res.sendStatus(404);
        }
    });
});

//delete
app.delete('/person/:loginID', function(req, res) {
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var comments = JSON.parse(data);

        var people = [];

        console.log(req.params.loginID);

        for (i = 0; i < comments.length; i++){
            //console.log(i);
            //console.log(comments[i].loginID);
            
            if(comments[i].loginID == req.params.loginID){
               // console.log("person skipped");
            }else {
                people.push(comments[i]);
            }
        }

        fs.writeFile(COMMENTS_FILE, JSON.stringify(people, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
        //send the info if found otherwise send not found

            res.send("person Deleted");

    });
});

//update -> translating as post
app.post('/person/:loginID', function(req, res) {
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var comments = JSON.parse(data);
        var people = [];
        var fName = "";
        var lName = "";
        var lID = "";
        var sDate = "";


       // console.log(req.body.firstName);

        for (i = 0; i < comments.length; i++){
           // console.log(i);
           // console.log(comments[i].loginID);
            
            if(comments[i].loginID == req.params.loginID){
                //first name
               if(req.body.firstName != null){
                fName = (req.body.firstName);
               } else {
                fName = (comments[i].firstName);
               }

               //last name
               if(req.body.lastName != null){
                lName = (req.body.lastName);
               } else {
                lName = (comments[i].lastName);
               }

               //login id
               if(req.body.loginID != null){
                lID = (req.body.loginID);
               } else {
                lID = (comments[i].loginID);
               }

               //start date
               if(req.body.startDate != null){
                sDate = (req.body.startDate);
               } else {
                sDate = (comments[i].startDate);
               }

            var updatePerson = {
            firstName: fName,
            lastName: lName,
            loginID: lID,
            startDate: sDate,
        };

          //  console.log("updating Person");
            people.push(updatePerson);

            }else {
                people.push(comments[i]);
            }
        }

       // console.log(people);

        fs.writeFile(COMMENTS_FILE, JSON.stringify(people, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
        
    res.send("person updated");
    });
});

//same thing for put
app.put('/person/:loginID', function(req, res) {
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var comments = JSON.parse(data);
        var people = [];
        var fName = "";
        var lName = "";
        var lID = "";
        var sDate = "";


        //console.log(req.body.firstName);

        for (i = 0; i < comments.length; i++){
           // console.log(i);
            //console.log(comments[i].loginID);
            
            if(comments[i].loginID == req.params.loginID){
                //first name
               if(req.body.firstName != null){
                fName = (req.body.firstName);
               } else {
                fName = (comments[i].firstName);
               }

               //last name
               if(req.body.lastName != null){
                lName = (req.body.lastName);
               } else {
                lName = (comments[i].lastName);
               }

               //login id
               if(req.body.loginID != null){
                lID = (req.body.loginID);
               } else {
                lID = (comments[i].loginID);
               }

               //start date
               if(req.body.startDate != null){
                sDate = (req.body.startDate);
               } else {
                sDate = (comments[i].startDate);
               }

            var updatePerson = {
            firstName: fName,
            lastName: lName,
            loginID: lID,
            startDate: sDate,
        };

          //  console.log("updating Person");
            people.push(updatePerson);

            }else {
                people.push(comments[i]);
            }
        }

       // console.log(people);

        fs.writeFile(COMMENTS_FILE, JSON.stringify(people, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
        
        res.send("person Updated");
    
    });
});


