var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Users', new Schema({
	uname : String,
	password : String,
	email : String,
	timestamp: {type:Date, default:Date.now},
	token: String
}));