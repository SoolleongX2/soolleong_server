var express = require('express');
var router = express.Router();

// router.use('/users', require('./users'));
router.use('/record', require('./records'));

module.exports = router;



