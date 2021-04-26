const mongoose = require("mongoose");
require("dotenv").config()

const mongoURL = process.env.MONGO_URI;

mongoose.connect(mongoURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

mongoose.connection.on("connected", function () {
	console.log("MongoDB connected! :)");
});

mongoose.connection.on("disconnected", function () {
	console.log("MongoDB disconnected! :(");
});

mongoose.connection.on("err", function () {
	console.log("MongoDB error! Oh no!", err);
});


module.exports = {
    Actor: require("./Actor"),
    Movie: require("./Movie")
}