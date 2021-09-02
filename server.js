// here we write JS to build the server

const express = require("express");
const exphbs = require("express-handlebars");
// those above are for dependencies from package.json
// const bodyParser = require("body-parser");
// use body parser middleware for post
const mongoose = require("mongoose");
// mongoose is used to create collection, therefore i created models file in views.
const messageController = require("./controllers/messageController.js");

// const Message = require("./models/message.js");
// load models imported and stored in Message collection.
const path = require("path");

const app = express();
// enviroment variable for port in github. i use 3000 for development only

// app.use(bodyParser.urlencoded({ extended: false }));
//  it has urlecoded method to access object and make it false because we only want to recieve form data
// app.use(bodyParser.json()); // Javascript object notation. when we recev
/** now i can see in terminal that it worked like this
 * [Object: null prototype] {
  fullname: 'Rahmonjon Ibragimov',
  email: 'rahmonjon2@yahoo.com',
  message: 'Hello I am learning'
}
 */

const port = process.env.PORT || 3000;
// assign port as value
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// setup view engine method.
app.set("view engine", "handlebars");
//
app.use(express.static(__dirname + "/public/stylesheets/"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
  });
});
// I used get method to handle the route, / means homepage, and req => is incoming request from client, res => is respond from backend to the client
// res.send method is used to send message to the client

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
  });
});

app.post("/contactUs", (req, res) => {
  console.log(req.body);
});
// POST is used to send data to a server to create/update a resource. when i write in browser something. it shows undefined, so i have to parse init.
// npm install --save body-parser it is in package

app.use("/", messageController);

app.listen(port, () => {
  // console.log('Server is running on port' + port); instead of using concatinate, i can use with backtic & dollar sign and inject port in it.
  console.log(`Server is running on port ${port}`);
});
// app is to used to bring express module. it has listen method and used for port and call back funtion.
//  node server.js now go to the localhost:3000 in browser.
