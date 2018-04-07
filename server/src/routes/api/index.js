// /src/routes/api/index.js

var router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/source', require('./source'));
router.use('/newssource', require('./newssource'));
router.use('/save', require('./save'));
router.use('/news', require('./news'));

module.exports = router;