var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstname: {type: String},
    lastname: {type: String}
});

var UsersActivitySchema = new Schema({
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    UAString: {type: String, required: true},
    ipAddress: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

var user = Mongoose.model('user', UserSchema);
var userActivity = Mongoose.model('userActivity', UsersActivitySchema);

module.exports = {
    User: user,
    UserActivity : userActivity
};