const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema (
    {
        name: {type: String},
        titles: [ref Movie],
        imgUrl: {type: String}
    }
    {
        timestamps: true,
    }
)

const Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;