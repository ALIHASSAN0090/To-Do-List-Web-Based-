//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB" );


const ItemsSchema = {
  name : String
};

const Item = mongoose.model("Item" ,ItemsSchema )

const Item1 = new Item({
  name : "welcome to your todolist"
})

const Item2 = new Item({
  name : "hit + button for a new item."
})

const Item3 = new Item({
  name : "<-hit this to remove an item"
})

const defaultItems = [Item1 , Item2 , Item3];

Item.insertMany(defaultItems)
    .then(() => {
        console.log("Success");
    })
    .catch((err) => {
        console.error(err);
    });

    app.get("/", function(req, res) {
      // Use the promise returned by Item.find() to handle the result
      Item.find({})
          .then(foundItems => {
              if (foundItems.length === 0) {
                  // If no Items found, insert the default Items
                  return Item.insertMany(defaultItems);
              } else {
                  // If Items are found, render the list page with the found Items
                  res.render("list", { listTitle: "Today", newListItems: foundItems });
              }
          })
          .then(() => {
              // Redirect to the home route after inserting default Items
              res.redirect("/");
          })
          .catch(err => {
              console.log(err);
          });
  });
  
  
  
  
  

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    Items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});


// 345 (6:22)