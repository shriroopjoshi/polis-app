// /src/utils/newsapi.js

var fs = require('fs');
var path = require('path');

var config = path.join(__dirname, '../../config/newsapi.json');
var newsapi = JSON.parse(fs.readFileSync(config, 'UTF-8'));

module.exports = newsapi;