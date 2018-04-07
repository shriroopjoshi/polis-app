// /src/routes/api/save.js

var router = require('express').Router();
var newsapi = require('../../utils/newsapi');
var db = require('../../../db/db');
var auth = require('../../utils/auth');

router.get('/', function (req, res) {
    var user = auth(req);
    if (user == null) {
        res.status(401).json({ "error": "unauthorized" });
        return;
    }
    res.status(200).send(user.saved);
});

router.post('/', function (req, res) {
    var user = auth(req);
    if (user == null) {
        res.status(401).json({ "error": "unauthorized" });
        return;
    }
    user = db.get('users').find({ username: user.username }).value();
    var saved = user.saved;
    var newentry = req.body.newentry;
    newentry['saved-date'] = new Date().toISOString().split('T')[0];
    var newsaved = saved.concat(newentry);
    console.log(newsaved);
    db.get('users').find({ username: user.username }).assign({ saved: newsaved }).write();
    res.status(200).json({ "success": "article saved" });
});

router.delete('/', function (req, res) {
    var user = auth(req);
    if (user == null) {
        res.status(401).json({ "error": "unauthorized" });
        return;
    }
    // TODO: remove post from DB
});

module.exports = router;