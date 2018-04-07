// /src/routes/api/newssource

var router = require('express').Router();
var newsapi = require('../../utils/newsapi');
var db = require('../../../db/db');
var http = require('http');
var auth = require('../../utils/auth');

router.get('/', function (req, res) {
    var resbody = "";
    var options = {
        host: newsapi.baseURL,
        method: 'GET',
        headers: {
            'X-Api-Key': newsapi.apikey
        },
        path: '/v2/sources?language=en'
    };
    const request = http.request(options, function (response) {
        console.log('[HIT] ' + options.method + ' - ' + options.host + options.path);
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            resbody += chunk;
            return;
        });
        response.on('end', function () {
            res.status(200).send(JSON.parse(resbody));
        });
    });
    request.on('error', function (e) {
        console.error(e);
        res.status(500).json({ "error": "Internal server error" });
    });
    request.end();
});

router.post('/', function (req, res) {
    var user = auth(req);
    if (user == null) {
        res.status(401).json({ "error": "unauthorized" });
        return;
    }
    var newsources = req.body.sources;
    if (newsources instanceof Array && newsources.length == 5) {
        db.get('users').find({ username: user.username }).assign({ sources: newsources }).write();
        res.status(200).json({ "success": "Updated sources" });
    } else {
        res.status(200).json({ "error": "Incorrect input" });
    }
});

module.exports = router;