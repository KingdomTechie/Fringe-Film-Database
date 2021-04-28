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


// regex credit: https://stackoverflow.com/questions/38421664/fuzzy-searching-with-mongodb
// regex credit: https://youtu.be/9_lKMTXVk64
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


//Review
router.post("/:id/review", function (req, res)  {
    db.Movie.findById(req.params.id, function (err, foundMovie) {
        if (err) return res.send(err);
            console.log(err); 
            foundMovie.movieReviews.push(req.body)
            foundMovie.save();
       
            return res.redirect("/movies");
            
    });
});
    router.get("/:id/review", function (req, res) {
        const review = db.Movie.movieReviews
        db.Movie.find({"db.Movie.movieReviews": "review"}) ;
                
            if (err) {
                console.log(err);
                return res.send("Server Error")
            } else {
                const context = {review: foundReview}
                res.render("movieView/show", context);//val = document.getElementById('num').innerHTML;
            }
    });

//Create
router.post("/", function (req, res)  {
    db.Movie.create(req.body, function (err, createdMovie) {
        if (err) return res.send(err);


        db.Actor.findById(req.body.actors).exec(function (err, foundActor) {
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
                name: req.body.title,
                director: req.body.director,
                imgUrl: req.body.imgUrl
            }
        },
        {new: true},
        function (err, updatedMovie) {
            if (err) {
                console.log(err);
            } else {
                return res.redirect(`/actors/${updatedMovie._id}`)
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

