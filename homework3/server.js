//Lisa Terwilliger
/*Homework 3
	An mLab-based, MongoDB backend for your person data.
    A React frontend that allows the user to see a list of people and add a person.

    I couldn't get the front end to have the form on the same page as the comments... 
    So I kept it seperate.
*/
var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

const bodyParser = require('body-parser')


//lab 10
var MongoClient = require('mongodb').MongoClient
var db;

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//              Remember to mask password!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
MongoClient.connect('mongodb://cs336:<PASSWORD>@ds041939.mlab.com:41939/cs336_lct6', function (err, dbConnection) {
  if (err) throw err

   db = dbConnection; 
})

 app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('dist'));

// respond with greeting
app.get('/', function(req, res) {
   res.json("Hello! to look at all people in the organization type /people in the URL. Add a person by typing /personForm.html in the URL");
});



//Displays a list of all people objects 
app.get('/people', function(req, res) {
db.collection("people").find({}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
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
app.post('/people', function (req, res) {

     var newPerson = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        loginID: req.body.loginID,
        startDate: req.body.startDate,
    };
    db.collection("people").insertOne(newPerson, function(err, result) {
        if (err) throw err;
        var newId = result.insertedId;
        db.collection("people").find({}).toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    });

});



app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});

