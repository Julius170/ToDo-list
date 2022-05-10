// jhint esversion6

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
// const items = [];
// const workItems = [];

app.set('view engine', "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

mongoose.connect("mongodb://localhost/27017/to-do-listDB", {useNewUrlParser: true});

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema)

const item1 = new Item = ({
    name: "Welcome to your to-do list!"
});

const item2 = new Item = ({
    name: "<-- Hit this to delete an item."
});

const item3 = new Item = ({
    name: "Hit the + button to add a new item."
});

const defaultItems = [item1, item2, item3] 

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {
    Item.find({}, function(err, foundItem) {
        if (foundItem.length === 0) { 
            Item.insertMany(defaultItems, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Item successfully added to database");
                }
            });
            res.redirect("/");
        }
        else {
            res.render ("list", {listTitle: "Today", newListItems: foundItem});
        }
    });
});

app.post('/', (req, res)=>{
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const newItem  = new Item({
        name: itemName
    });

    if (listName === "Today") {
        newItem.save();
        res.redirect("/");
    } else {
        List.findOne({name:listName}, function(err, foundList) {
            foundList.items.push(newItem);
            foundList.save();
            res.redirect('/' + listName);
        })
    }

});

app.get("/about", (req, res)=>{
    res.render("about")
});

app.post('/delete', function(req, res) {
    const listName = req.body.listName;
    const checkedItemId = (req.body.checkbox);
    if (listName === "Today") {
        Item.findByIdAndRemove(checkedItemId, function(err) {
        if (err) {
                console.log(err);
            } else {
                console.log("Checked item successfully removed");
                res.redirect('/');
            }
        });
    } else{
        List.findOneAndUpdate(
            {name: listName},
            {$pull: {items: {_id: checkedItemId}}},
            function(err, foundList) {
                if(!err) {
                    res.redirect('/'+ listName); 
                }
            });
    }
    })


app.get("/:anotherToDoList", (req, res) => {
    const anotherToDoList = _.capitalize(req.params.anotherToDoList);
    List.findOne({name:anotherToDoList}, function(err, foundList) {
        if (!err) {
            if (foundList) { 
                // Show the existing list
                res.render("list", {listTitle:foundList.name, newListItems: foundList.items})
            } else {
                // Create a new list 
                const list = new List({
                    name: anotherToDoList,
                    items: defaultItems
                });
                list.save();
                res.render("list", {listTitle:foundList.name, newListItems: foundList.items});
                res.redirect("/"+ anotherToDoList);
            }
        }else {
            console.log(err);
        }
    });
});



app.listen (3010, function() {
    console.log("Server is runing on port http://localhost:3010/")
});


