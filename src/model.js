var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstname: {type: String},
    lastname: {type: String}
});

var UsersActivitySchema = new Schema({
    username: {type: String, required: true},
    UAString: {type: String, required: true},
    ipAddress: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

var user = Mongoose.model('user', UserSchema);
var userActivity = Mongoose.model('userActivity1', UsersActivitySchema);

module.exports = {
    User: user,
    UserActivity : userActivity
};