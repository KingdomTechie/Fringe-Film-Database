
//TODO - Have full CRUD functionality
/* 
  CRUD Functionality
  C-reate
  R-ead
  U-pdate
  D-estroy
*/

// External Modules
const express = require("express");
const methodOverride = require("method-override");

// Internal Modules

// Instanced Modules
const app = express();

// Configuration Variables
const PORT = 4000

// App Configuration
app.set("view engine", "ejs")

// Middleware
app.use(express.urlencoded({extended: true}));

// Session middleware takes in a config object

// Logger Middleware (helper tool) - make sure to pass in req object, resp object, and next

// Controllers

// Homepage
app.get("/", function (req, res) {
    res.render("index.ejs")
})

// Server Bind
app.listen(PORT, () => {console.log("Server is up and running")});




