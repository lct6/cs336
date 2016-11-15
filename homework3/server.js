//Lisa Terwilliger
//Homework 3


var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var HttpStatus = require('http-status-codes');
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

 
app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('dist'));

// respond with greeting
app.get('/', function(req, res) {
   res.json("Hello! to look at all people in the organization type /people in the URL");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});




//-----------------------------------------------------------------------------------------------
//***********************************************************************************************
//************************************** FOR HW 3************************************************
//***********************************************************************************************
//-----------------------------------------------------------------------------------------------




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
app.post('/pepole', function (req, res) {

     var newComment = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        loginID: req.body.loginID,
        startDate: req.body.startDate,
    };
    db.collection("people").insertOne(newComment, function(err, result) {
        if (err) throw err;
        var newId = result.insertedId;
        db.collection("people").find({}).toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    });

});






