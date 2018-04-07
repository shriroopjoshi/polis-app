// /src/routes/api/news.js

var router = require('express').Router();
var newsapi = require('../../utils/newsapi');
var db = require('../../../db/db');
var auth = require('../../utils/auth');
var http = require('http');

router.get('/:source', function(req, res) {
    console.log('source: ' + req.params.source);
    var user = auth(req);
    if(user == null) {
        res.status(401).json({"error": "unauthorized"});
        return;
    }
    var resbody = "";
    var options = {
        host: newsapi.baseURL,
        method: 'GET',
        headers: {
            'X-Api-Key': newsapi.apikey
        },
        path: '/v2/top-headlines?pageSize=10&sources=' + req.params.source
    };
    const request = http.request(options, function(response) {
        console.log('[HIT] ' + options.method + ' - ' + options.host + options.path);
        response.setEncoding('utf8');
        response.on('data', function(chunk) {
            resbody += chunk;
            return;
        });
        response.on('end', function() {
            var news = JSON.parse(resbody).articles;
            res.status(200).send(news);
        });
    });
    request.on('error', function(e) {
        console.error(e);
        res.status(500).json({"error": "Internal server error"});
    });
    request.end();
});

module.exports = router;