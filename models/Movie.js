const mongoose = require("mongoose");
const Actor = require("../models/Actor.js")

const movieSchema = new mongoose.Schema(
    {
        title: {type: String},
        director: {type: String},
        movieReviews: [{body: String}],
        imgUrl: [{type: String}],
        ratingUp: {type: Number, default: 0},
        ratingDown: {type: Number, default: 0},
        
        actors: [{type: mongoose.Schema.Types.ObjectId, ref: "Actor", unique: true}, ]
    },
    {
        timestamps: true,
    }
)

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;