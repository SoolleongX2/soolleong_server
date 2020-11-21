const {Record} = require('../models');
const util = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const service = require('../service/recordService');

module.exports = {
    getLeftDrinks: async (req, res) => {
        try {
            console.log(req.decoded)
            const goal = await service.getGoal();
            // 이번주 레코드 합 가져오기
            const {bottle, glass} = await service.getShotLeft(goal);
            const day = await service.todayToDay();

            res.status(sc.OK).send(util.success(sc.OK, rm.RECORD_GET_SUCCESS, {bottle, glass, day}))
        } catch (err) {
            console.error(err);
        }
    },
    postTodayDrinks : async (req, res) => {
        try {
            const {bottle, glass} = req.body;
    
            // 최근 목표 가져오기
            // const startDay = await Goal.max('createdAt', { where : {UserId : 1}});
            const goal = await service.getGoal();
            const td = Date.now();
            const today = new Date(td);
            const day = goal.createdAt.getDate() - today.getDate() + 1; 
            
            if(!bottle || !glass) {
                res.status(sc.BAD_REQUEST).send(util.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
            }
            const alcoholCount = bottle * 7 + glass;
            console.log(day, alcoholCount)

            const record = await Record.create({
                day,
                alcoholCount,
                userId : 1,
                GoalId : goal.id,
            })

            res.status(sc.OK).send(util.success(sc.OK, rm.RECORD_SUCCESS, record))
            

        } catch (err) {
            console.error(err);
        }

    },
    getWeekDrinks : async (req, res) => {
        try {
            const day = await service.todayToDay();
            const goal = await service.getGoal();
            const {shotSum} = await service.getShotLeft(goal);
            const bottle = Math.floor(shotSum / 7);
            const glass = shotSum % 7;
    
            const records = await service.getRecords(goal);
            
            res.status(sc.OK).send(util.success(sc.OK, rm.RECORD_GET_WEEK_DATA_SUCCESS, {day,bottle, glass, records }))
        } catch (err) {
            console.error(err);
        }
    }
}