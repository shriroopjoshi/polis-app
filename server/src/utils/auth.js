// /src/utils/auth.js

var db = require('../../db/db');

var auth = function (req) {
    var user = req.headers['username'];
    if (user == null) {
        return null;
    }
    var user = db.get('users').find({ username: user }).value();
    if (user == null) {
        return null;
    }
    return user;
}

module.exports = auth;