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


//Index
router.get("/", function(req, res) {
    db.Actor.find({}, function (err, foundActor) {
        if (err) return res.send(err)

        const context = {movie: foundMovie};
        res.render("actorViews/index", context)
    });
});

// New 

router.get("/new", function (req, res) {
    db.Actor.find({}, function (err, foundMovies) {
        if (err) return res.send(err)

        const context = {movies: foundMovies};
        res.render("actorViews/new.ejs", context)
    })
});


//Show
router.get("/:id", function(req, res) {
    res.render("actorViews/show.ejs");
});

//Create
router.post("/", function (req, res)  {
    db.Actor.create(req.body, function (err, createdActor) {
        if (err) return res.send(err);

        return res.redirect("actors");
    });
});

//Edit
router.get("/:id/edit", function (req, res) {
    res.render("./edit.ejs");
});

router.put("/:id", function (req, res) {
    const id = req.params.id;
    db.Actor.findByIdAndUpdate(
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
    db.Actor.findByIdAndDelete(
        id, 
        (err, deletedMovie) => {
            console.log(deletedMovie);
        });
     });


module.exports = router;
