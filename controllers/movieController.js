// require express
const express = require("express");
// set up router
const router = express.Router();
// internal modules (database)
const db = require("../models");

// base routes (movies)
// Rest Routes
/*
 * Index - GET - /  movies  - Presentational - respond with all movies
 * New - GET - /movies/new  - Presentational Form - a page with a form to create a new movie
 * Show - GET - /movies/:id  - Presentational - respond with specific movie by id
 * Create - Post - /movies  - Functional - recieve data from new route to create a movie
 * Edit - GET - /movies/:id/edit  - Presentational Form - respond with a form prefilled with movie data
 * Update - PUT - /movies/:id  - Functional - recieve data from edit to update a specific movie
 * Delete - DELETE - /movies/:id  - Functional - Deletes movie by id from request
 */


//Index
router.get("/", function (req, res) {
    res.render("./index.ejs");
});

//New
router.get("/new", function (req, res) {
    res.render("./new.ejs")
});

//Show
router.get("/:id", function (req, res) {
    res.render("./show.ejs")
});

//Create
router.post("/", function (req, res)  {
    db.Movie.create(req.body, function (err, createdMovie) {
        if (err) return res.send(err);

        return res.redirect("movies");
    });
});
//Edit
router.get("/:id/edit", function (req, res) {
    res.render(".edit.ejs");
});

//Update
router.put("/:id", function (req, res) {
    const id = req.params.id;
    db.Movie.findByIdAndUpdate(
        id, 
        {
            $set: { 
                name: req.body.name,
                imgUrl: req.body.imgUrl
            }
        }
    )
});

router.delete("/:id", function (req, res) {
    const id = req.params.id;
    db.Movie.findByIdAndDelete(
        id, 
        (err, deletedMovie) => {
            console.log(deletedMovie);
        });
     });

     module.exports = router;

