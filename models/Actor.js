const mongoose = require("mongoose");
const Movie = require("../models/Movie")

const actorSchema = new mongoose.Schema (
    {
        name: {type: String},
        imgUrl: [{type: String}],
        actorBio: {body: String},
        
        titles: [{type: mongoose.Schema.Types.ObjectId, ref: "Movie", index: {unique: true, dropDups: true}}],
    },
    {
        timestamps: true,
    }
)

const Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;