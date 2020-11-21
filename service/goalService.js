const {
    Goal,
    User
} = require('../models');

module.exports = {
    createGoal: async (id, alcoholType, alcoholCount) => {
        try {
            const goal = Goal.create({
                UserId: id,
                alcoholType: alcoholType,
                alcoholCount: alcoholCount,
            });
            return goal;
        } catch(error){
            throw error;
        }
    },
    getLatestGoal: async(id) => {
        try{
            const goal  = Goal.findAll({
                limit: 1,
                where: {
                    UserId: id,
                },
                attributes:['alcoholCount', 'createdAt'],
                order: [['createdAt', 'DESC']]
            });
            return goal;
        }catch(error){
            throw error;
        }
    },
};