// /src/routes/api/auth.js

var router = require('express').Router();
var db = require('../../../db/db');

router.get('/auth', function(req, res) {
    res.status(200).json({"error": "Use POST"});
});

router.post('/auth', function(req, res) {
    console.log('AUTH request for: {username = ' + req.body.username + ', password = ' + req.body.password + '}');
    var users = db.get('users');
    var user = users.find({username: req.body.username, password: req.body.password}).value();
    if(user == null) {
        res.status(401).json({"error": "Incorrect username or password"});
    } else {
        res.status(200).json({"user": user.username});
    }
});

module.exports = router;