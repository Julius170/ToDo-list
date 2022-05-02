// jhint esversion6


const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.set('view engine', "ejs");


app.get("/", function(req, res) {
    var today = new Date();
    var currentDay = today.getDay()
    var day = "";

    if (currentDay === 1) {
        day = "Sunday";
    }
    else if (currentDay === 2){
        day = 'Monday'
    }
    else if (currentDay === 3){
        day = 'Tuesday'
    }
    else if (currentDay === 4){
        day = 'Wednesday'
    }  
    else if (currentDay === 5){
        day = 'Thursday'
    }  
    else if (currentDay === 6){
        day = 'Friday'
    }  
    else if (currentDay === 7){
        day = 'Saturday'
    }
    else {
    console.log("Error: current day is " + day)
    }

    res.render ("list", {kindOfDay: day});
});


app.listen (3010, function() {
    console.log("Server is runing on port http://localhost:3010/")
});


