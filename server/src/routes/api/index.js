// /src/routes/api/index.js

var router = require('express').Router();

router.use('/', require('./auth'));

module.exports = router;