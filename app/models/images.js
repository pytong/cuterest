"use strict";

let mongoose = require("mongoose"),
	Schema = mongoose.Schema,

	Image = new Schema({
		url: String,
		username: String
	});

module.exports = mongoose.model("Image", Image);
