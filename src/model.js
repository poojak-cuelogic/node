var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstname: {type: String},
    lastname: {type: String}
});

var user = Mongoose.model('user', UserSchema);

module.exports = {
    User: user
};