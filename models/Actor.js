const mongoose = require("mongoose");
const Movie = require("../models/Movie")

const actorSchema = new mongoose.Schema (
    {
        name: {type: String},
        imgUrl: [{type: String}],
        
        titles: [{type: mongoose.Schema.Types.ObjectId, ref: "Movie"}],
    },
    {
        timestamps: true,
    }
)

const Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;