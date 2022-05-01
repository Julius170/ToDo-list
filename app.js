// jhint esversion6


const bodyParser = require('body-parser');
const express = require('express');

const app = express()
app.get("/", function(req, res) {
    // res.send (__dirname + "/index.html");

    var today = new Date();
    var currentDay = today.getDay()
    if (currentDay === 1 || currentDay === 6) {
        res.send ("Yay its the weekend!");
    }else {
        res.send(__dirname + "index.html")
    }

});


app.listen (3010, function() {
    console.log("Server is runing on port http://localhost:3010/")
});


