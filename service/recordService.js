const {Record, Goal} = require('../models');

module.exports = {
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
    }
}