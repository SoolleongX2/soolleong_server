const express = require('express');
const router = express.Router();
const recordController = require('../../controller/recordController');
const auth = require('../../middlewares/authUtil');

router.get('/', recordController.getLeftDrinks);
router.post('/', recordController.postTodayDrinks);
router.get('/week', recordController.getWeekDrinks);

module.exports = router;