const express = require("express")
const bodyParser = require("body-parser")
const app = express();

const HOST = "localhost";
const PORT = 3000;

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/hello', function (req, res) {
	res.send('{"message": "Hello, ' + req.query.name + '"}')
})

app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});