var express = require('express');
var router = express.Router();

router.use('/users', require('./users'));
router.use('/record', require('./records'));
// router.use('/goals',require('./goals'));


module.exports = router;



