const express = require('express');
const router = express.Router();
const goalController = require('../../controller/goalController');
const authUtil = require('../../middlewares/authUtil');

router.post('/', authUtil.checkToken, goalController.createGoal);
router.get('/', authUtil.checkToken, goalController.getGoal);

module.exports = router