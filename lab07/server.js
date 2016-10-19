const express = require("express")
const app = express();

const HOST = "localhost";
const PORT = 3000;

app.use(express.static("public"));

app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});