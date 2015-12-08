'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,

	User = new Schema({
		username: String,
		password: String,
		name: String,
		city: String,
		state: String
	});

module.exports = mongoose.model('User', User);
