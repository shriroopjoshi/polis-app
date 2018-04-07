// /db/db.js

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./db/data/dump.json');
var db = low(adapter);

db.defaults({users: []})
    .write();

module.exports = db;
