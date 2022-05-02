// jhint esversion6


const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.set('view engine', "ejs");


app.get("/", function(req, res) {
    var today = new Date();
    var currentDay = today.getDay()
    var day = "";
    if (currentDay === 1 || currentDay === 6) {
        day = "weekend";
        res.render ("list", {kindOfDay: day});
    }else {
        day = 'weekday'
        res.render(__dirname + "/weekday.html");
    }
    
});


app.listen (3010, function() {
    console.log("Server is runing on port http://localhost:3010/")
});


