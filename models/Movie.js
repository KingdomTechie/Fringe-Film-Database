const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema(
    {
        title: {type: String},
        director: {type: String},
        movieReviews: [{body: String}],
        imgUrl: {type: String},
        rating: {type: Number},
        actor: [ref Actor]
    }
    {
        timestamps: true,
    }
)

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;