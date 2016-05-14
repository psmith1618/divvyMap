var mongoose = require('mongoose');

var Schema  = mongoose.Schema;

var UserSchema   = new Schema({
    first_name: String,
    last_name: String
});

//export the schema so it can be used elsewhere in the application
// (wherever we require it)

module.exports = mongoose.model('User', UserSchema);