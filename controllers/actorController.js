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

// regex credit: https://stackoverflow.com/questions/38421664/fuzzy-searching-with-mongodb
// regex credit: https://youtu.be/9_lKMTXVk64
//Index
router.get("/", function (req, res) {
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    db.Actor.findOne({ name: regex }, function (err, foundActor) {
      if (err) {
        console.log(err);
        return res.send("Actor may not be in database");
      } else {
        res.redirect(`actors/${foundActor._id}`);
      }
    });
  } else {
    db.Actor.find({}, function (err, allActors) {
      if (err) {
        console.log(err);
      } else {
        const context = { movies: allActors };
        res.render("actorViews/index");
      }
    });
  }
});

// New
router.get("/new", function (req, res) {
  db.Movie.find({}, function (err, foundMovies) {
    if (err) return res.send(err);

    const context = { movies: foundMovies };
    res.render("actorViews/new.ejs", context);
  });
});

//Show
router.get("/:id", function (req, res) {
  const id = req.params.id;

  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    db.Actor.findOne({ name: regex }, function (err, foundActor) {
      if (err) {
        console.log(err);
      } else {
        res.redirect(`/actors/${foundActor._id}`);
      }
    });
  } else {
    db.Actor.findById(id)
      .populate("titles")
      .exec(function (err, foundActor) {
        if (err) return res.send(err);

        const context = { actor: foundActor };
        res.render("actorViews/show.ejs", context);
      });
  }
});

//Create
router.post("/", function (req, res) {
  db.Actor.create(req.body, function (err, createdActor) {
    if (err) return res.send(err);

    if (req.body.titles) {
      db.Movie.findById(req.body.titles).exec(function (err, foundMovie) {
        if (err) return res.send(err);

        console.log(foundMovie, "foundMovie");
        foundMovie.actors.push(createdActor);
      });
    }
    return res.redirect("/actors");
  });
});

//Edit
router.get("/:id/edit", function (req, res) {
  const id = req.params.id;
  db.Actor.findById(id, function (err, foundActor) {
    if (err) {
      console.log(err);
      return res.send("Server Error");
    } else {
        db.Movie.find({}, function (err, foundMovie) {
          if (err) return res.send(err)

          const context = { actor: foundActor,
                            movie: foundMovie,};
          res.render("actorViews/edit", context);
        })
      
    }
  });
});

// Update
router.put("/:id", function (req, res) {
  const id = req.params.id;
  db.Actor.findByIdAndUpdate(
    id,
    {
      $set: {
        name: req.body.name,
        imgUrl: req.body.imgUrl,
      },
    },
    { new: true },
    function (err, updatedActor) {
      if (err) {
        console.log(err);
      } else {
        return res.redirect(`/actors/${updatedActor._id}`);
      }
    }
  );
});

router.delete("/:id", function (req, res) {
  const id = req.params.id;
  db.Actor.findByIdAndDelete(id, (err, deletedMovie) => {
    console.log(deletedMovie);
  });
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
