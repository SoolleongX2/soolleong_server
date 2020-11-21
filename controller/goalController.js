const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const responseMessage = require('../modules/responseMessage');
const goalService = require('../service/goalService');

const {
    Goal
} = require('../models');
const jwt = require('../modules/jwt');

module.exports = {
    createGoal: async (req, res) => {
        const { id } = req.decoded;
        const {
            alcoholType,
            bottle
        } = req.body;
            
        
        if(!id || !alcoholType || !bottle){
            console.log(`필요한 값이 없습니다. (id: ${id}, alcoholType: ${alcoholType}, bottle: ${bottle})`);
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
    
        try{
            alcoholCount = bottle * 7
            const goal = await goalService.createGoal(id, alcoholType, alcoholCount)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CREATE_GOAL_SUCCESS, {
                alcoholType: goal.alcoholType,
                alcoholCount: goal.alcoholCount
            }));
        
        }catch(error){
            console.log(error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).fail(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_GOAL_FAIL));
        };
    },
    getGoal: async(req, res) => {
        const { id } = req.decoded;
        console.log(`id: ${id}`);

        try{
            const goal = await goalService.getLatestGoal(id)
            const bottle = Math.floor(goal[0].alcoholCount / 7)
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_GOAL_SUCCESS, {
                bottle
            }));
        }catch(error){
            console.error(error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_GOAL_FAIL));
        }
    }
}