const {Record, Goal, sequelize} = require('../models');
const util = require('../modules/util');
const sc = require('../modules/statusCode')
const rm = require('../modules/responseMessage');
const service = require('../service/recordService');
const Date = require('date-utils');

module.exports = {
    getLeftDrinks: async (req, res) => {

    },
    postTodayDrinks : async (req, res) => {
        const {bottle, glass} = req.body;

        // 최근 목표 가져오기
        const goal = Goal.findOne({
            order : [
                sequelize.fn('max', sequelize.col('createdAt'))
            ]
        })
        const td = Date.now();
        const today = new Date(td);
        const startDate = goal.createdAt;
        const day = startDate.getDate() - today.getDate();
        
        if(!bottle || !glass) {
            res.status(sc.BAD_REQUEST).send(util.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }
        const alcoholCount = bottle * 7 + glass;
        console.log(day, alcoholCount);

    },
    getWeekDrinks : async (req, res) => {

    }
}