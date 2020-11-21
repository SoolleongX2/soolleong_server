const {Record, Goal} = require('../models');
const moment = require('moment');

module.exports = {
    getGoal : async (UserId) => {
        try{
            const goal = await Goal.findOne({
                limit : 1,
                order : [['createdAt', 'DESC']],
                where : { UserId},
            });
            return goal;

        } catch (err){
            console.error(err);
        }
    },
    todayToDay : async (UserId) => {
        try {
            const goal = await Goal.findOne({
                limit : 1,
                order : [['createdAt', 'DESC']],
                where : { UserId },
            });
            const td = Date.now();
            const today = new Date(td);
            const todayDate = moment.tz(today, 'Asia/Seoul').format('DD');
            const startDate = moment.tz(goal.createdAt, 'Asia/Seoul').format('DD');
            const day = todayDate -startDate+ 1; 
            console.log(todayDate, startDate);
            console.log(startDate);
            return day;
        } catch (err) {
            console.error(err);
        }
    },
    getShotLeft : async (goal) => {
        try {
            const records = await Record.findAll({
                    where : { GoalId : goal.id},
                })
            let shotSum = 0
            records.filter(m => {shotSum += m.alcoholCount});
                
            let shotleft = goal.alcoholCount - shotSum;
            if (shotleft < 0) {
                shotleft = 0;
            }
            return {shotSum, bottle : Math.floor(shotleft / 7), glass : shotleft % 7}
        } catch (err) {
            console.error(err);
        }
    },
    getRecords : async (goal) => {
        try {
            let records = await Record.findAll({
                where : { GoalId : goal.id},
                attributes : ['day', 'createdAt', 'alcoholCount'],
            })
            records = records.map(m => {
                return {
                    month: m.createdAt.getMonth() + 1,
                    day : m.createdAt.getDate(),
                    bottle: Math.floor(m.alcoholCount/7),
                    glass : m.alcoholCount%7,
                    dayCount : m.day,
            }})
            return records
        } catch (err) {
            console.error(err);
        }
    }
}