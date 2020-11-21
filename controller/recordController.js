const {Record} = require('../models');
const util = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const service = require('../service/recordService');
const moment = require('moment');

module.exports = {
    getLeftDrinks: async (req, res) => {
        try {
            const goal = await service.getGoal(req.decoded.id);
            console.log(goal.createdAt)
            if (! goal) {
                return res.status(sc.NOT_FOUND).send(util.fail(sc.NOT_FOUND, rm.GET_GOAL_FAIL));
            }
            // 이번주 레코드 합 가져오기
            const {bottle, glass} = await service.getShotLeft(goal);
            const day = await service.todayToDay(req.decoded.id);

            res.status(sc.OK).send(util.success(sc.OK, rm.RECORD_GET_SUCCESS, {bottle, glass, day}))
        } catch (err) {
            console.error(err);
        }
    },
    postTodayDrinks : async (req, res) => {
        try {
            const {bottle, glass} = req.body;
            if((!bottle && bottle != 0 )|| (!glass && glass != 0)) {
                return res.status(sc.BAD_REQUEST).send(util.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
            }
    
            // 최근 목표 가져오기
            // const startDay = await Goal.max('createdAt', { where : {UserId : 1}});
            const goal = await service.getGoal(req.decoded.id);
            if (! goal) {
                return res.status(sc.NOT_FOUND).send(util.fail(sc.NOT_FOUND, rm.GET_GOAL_FAIL));
            }
            const td = Date.now();
            const today = new Date(td);
            const todayDate = moment.tz(today, 'Asia/Seoul').format('DD');
            const startDate = moment.tz(goal.createdAt, 'Asia/Seoul').format('DD');
            const day = todayDate - startDate + 1; 
            
            
            const alcoholCount = bottle * 7 + glass;

            const record = await Record.create({
                day,
                alcoholCount,
                userId : 1,
                GoalId : goal.id,
            })

            res.status(sc.OK).send(util.success(sc.OK, rm.RECORD_SUCCESS))
            

        } catch (err) {
            console.error(err);
        }

    },
    getWeekDrinks : async (req, res) => {
        try {
            const day = await service.todayToDay(req.decoded.id);
            const goal = await service.getGoal(req.decoded.id);
            if (! goal) {
                return res.status(sc.NOT_FOUND).send(util.fail(sc.NOT_FOUND, rm.GET_GOAL_FAIL));
            }
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