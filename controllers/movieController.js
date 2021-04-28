// require express
const express = require("express");
// set up router
const router = express.Router();
// internal modules (database)
const db = require("../models"); //?("../models/Movie.js")

//body-parser
//const bodyParser = require("body-parser");



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
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        db.Movie.findOne({title: regex}, function (err, foundMovie) {
            if (err) {
                console.log(err);
            } else {
                res.redirect(`movies/${foundMovie._id}`)
                }
            })
    } else {
    db.Movie.find({}, function (err, allMovies) {
        if (err) {
            console.log(err);
        } else {
            const context = {movies: allMovies}
            res.render("movieViews/index")
            }
        })
    }
});

//New
router.get("/new", function (req, res) {
    
    db.Actor.find({}, function (err, foundActor) {
        if (err) return res.send(err)

        const context = {actor: foundActor};
        res.render("movieViews/new.ejs", context)

    })
    
});

//Show
router.get("/:id", function (req, res) {
    const id = req.params.id;

    db.Movie.findById(id, function (err, foundMovie) {
        if (err) {
            console.log(err);
            return res.send("Server Error")
        } else {
            const context = {movie: foundMovie}
            res.render("movieViews/show.ejs", context)
        }
    })
   
});

//Create
router.post("/", function (req, res)  {
    db.Movie.create(req.body, function (err, createdMovie) {
        if (err) return res.send(err);


        db.Actor.findById(createdMovie.actors).exec(function (err, foundActor) {
            if (err) return res.send(err);
            console.log(foundActor, "foundActor");
            foundActor.titles.push(createdMovie)
            foundActor.save();
        })

        return res.redirect("movies");

    });
});

//Edit
router.get("/:id/edit", function (req, res) {
    const id = req.params.id;
    db.Movie.findById(id, function (err, foundMovie) {
        if (err) {
            console.log(err);
            return res.send("Server Error")
        } else {
            const context = {movie: foundMovie}
            res.render("movieViews/edit", context);
        }
    })
    
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
    db.Movie.findByIdAndDelete(id, function (err, deletedMovie) {
        if (err) return res.send(err);

        return res.redirect("/movies")
    })
     });

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };   

    module.exports = router;

