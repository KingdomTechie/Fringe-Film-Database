// require express
const express = require("express");
// set up router
const router = express.Router();
// internal modules (database)
const db = require("../models");

// base routes (actors)
// Rest Routes
/*
 * Index - GET - /actors  - Presentational - respond with all actors
 * New - GET - /actors/new  - Presentational Form - a page with a form to create a new author
 * Show - GET - /actors/:id  - Presentational - respond with specific author by id
 * Create - Post - /actors  - Functional - recieve data from new route to create a actor
 * Edit - GET - /actors/:id/edit  - Presentational Form - respond with a form prefilled with actor data
 * Update - PUT - /actors/:id  - Functional - recieve data from edit to update a specific actor
 * Delete - DELETE - /actors/:id  - Functional - Deletes author by id from request
 */

// Index
// async - await
// try - catch

  
	



//Index
router.get("/", function(req, res) {
    res.render("./index.ejs");
});
// New 

router.get("/new", function(req, res) {
    res.render("./new.ejs");
});


module.exports = router;
