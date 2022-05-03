// jhint esversion6

const bodyParser = require('body-parser');
const express = require('express');

const app = express();
let items = ["Buy Food", "Cook Food", "Eat Food"];

app.set('view engine', "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


app.get("/", function(req, res) {
    let today = new Date();

    let options = {
        weekday:'long',
        day: 'numeric', 
        month: 'long',
    };
    let day = today.toLocaleDateString('en-US', options)

    res.render ("list", {kindOfDay: day, newListItems: items});
});

app.post('/', (req, res)=>{
    let item = (req.body.newItem);
    items.push(item);
    
    res.redirect("/");

});






app.listen (3010, function() {
    console.log("Server is runing on port http://localhost:3010/")
});


