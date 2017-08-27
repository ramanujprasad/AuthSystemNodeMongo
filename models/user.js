
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	id: String,
	name: String,
	username: String,
	password: String,
	email: String
});