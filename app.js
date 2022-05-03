// jhint esversion6

const bodyParser = require('body-parser');
const express = require('express');
const date = require(__dirname + '/date.js');

const app = express();
const items = [];
const workItems = [];

app.set('view engine', "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


app.get("/", function(req, res) {
    const day = date.getDate();
    res.render ("list", {listTitle: day, newListItems: items});
});

app.post('/', (req, res)=>{
    const item = (req.body.list[0]);
    if ((req.body.list[1]) === 'Work') {
        workItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item); 
        res.redirect("/");
        
    }
});

app.get("/about", (req, res)=>{
    res.render("about")
}
)

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", newListItems: workItems});


});



app.listen (3010, function() {
    console.log("Server is runing on port http://localhost:3010/")
});


