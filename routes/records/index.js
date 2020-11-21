const express = require('express');
const router = express.Router();
const recordController = require('../../controller/recordController');
const auth = require('../../middlewares/authUtil');

router.get('/', auth.checkToken , recordController.getLeftDrinks);
router.post('/', auth.checkToken, recordController.postTodayDrinks);
router.get('/week', auth.checkToken, recordController.getWeekDrinks);

module.exports = router;