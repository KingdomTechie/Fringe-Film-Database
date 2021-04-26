const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema (
    {
        name: {type: String},
        titles: {type: String},
        imgUrl: {type: String}
    }
)

const Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;