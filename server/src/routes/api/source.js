// /src/routes/api/source

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
    var sources = user.sources;
    if (sources.length === 0) {
        res.status(200).json({ "error": "No source found" });
    } else {
        res.status(200).json(sources);
    }
});

module.exports = router;