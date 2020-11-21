const {Record, Goal} = require('../models');

module.exports = {
    getGoal : async () => {
        const goal = await Goal.findOne({
            limit : 1,
            order : [['createdAt', 'DESC']],
            where : { UserId : 1},
        });
        console.log(goal);
        return goal;
    },
    todayToDay : async () => {
        const goal = await Goal.findOne({
            limit : 1,
            order : [['createdAt', 'DESC']],
            where : { UserId : 1},
        });
        const td = Date.now();
        const today = new Date(td);
        const day = goal.createdAt.getDate() - today.getDate() + 1; 
        return day;
    },
    getShotLeft : async (goal) => {
        const records = await Record.findAll({
                where : { GoalId : goal.id},
            })
        let shotSum = 0
        records.filter(m => {shotSum += m.alcoholCount});
            
        console.log(shotSum);
        let shotleft = goal.alcoholCount - shotSum;
        if (shotleft < 0) {
            shotleft = 0;
        }
        return {shotSum, bottle : Math.floor(shotleft / 7), glass : shotleft % 7}
    },
    getRecords : async (goal) => {
        let records = await Record.findAll({
            where : { GoalId : goal.id},
            attributes : ['day', 'createdAt', 'alcoholCount'],
        })
        console.log(records)
        records = records.map(m => {
            return {
            month: m.createdAt.getMonth() + 1,
            day : m.createdAt.getDate(),
            bottle: Math.floor(m.alcoholCount/7),
            glass : m.alcoholCount%7,
            dayCount : m.day,
        }})
        return records
    }
}