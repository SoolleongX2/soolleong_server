const {Record, Goal} = require('../models');
const util = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const service = require('../service/recordService');
const date = require('date-utils');
const { response } = require('express');

module.exports = {
    getLeftDrinks: async (req, res) => {
        try {
            // 이번주 모든 레코드 가져오기
            const goal = await Goal.findOne({
                limit : 1,
                order : [['createdAt', 'DESC']],
                where : { UserId : 1},
            });
            console.log(goal);
            const records = await Record.findAll({
                where : { GoalId : goal.id },
            })
            let shotSum = 0
            records.filter(m => {shotSum += m.alcoholCount});
            
            console.log(shotSum);
            let shotleft = goal.alcoholCount - shotSum;
            if (shotleft < 0) {
                shotleft = 0;
            }
            const bottle = Math.floor(shotleft / 7);
            const glass = shotleft % 7;
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
            const goal = await Goal.findOne({
                limit : 1,
                order : [['createdAt', 'DESC']],
                where : { UserId : 1},
            });
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

    }
}