const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const responseMessage = require('../modules/responseMessage');
const {
    User
} = require('../models');
const {
    userService,
    goalService
} = require('../service');

const jwt = require('../modules/jwt');
const moment = require('moment');

module.exports = {
    signin: async (req, res) => {
        const {
            uuid
        } = req.body;

        if (!uuid) {
            console.log('필요한 값이 없습니다.');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }

        try {
            const alreadyUser = await userService.checkIfExist(uuid);
            if (alreadyUser) {
                const {
                    token
                } = await jwt.sign(alreadyUser);
                const goal = await goalService.getLatestGoal(alreadyUser.id)
                let isGoal = false

                const td = Date.now();
                const today = new Date(td);
                const todayDate = moment.tz(today, 'Asia/Seoul').format('DD');
                if (goal[0]) {
                    const lastGoalDate =  todayDate - goal[0].createdAt.getDate()+ 1;
                    console.log(lastGoalDate, goal[0].createdAt, todayDate);
                    if (lastGoalDate <= 7){isGoal = true}
                }
                
                return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, {
                    token,
                    uuid: alreadyUser.uuid,
                    isGoal
                }));
            } else {
                const user = await userService.createUser(uuid);
                const {
                    token
                } = await jwt.sign(user);
                return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_UP_SUCCESS, {
                    token,
                    uuid: user.uuid,
                    isGoal: false,
                }));
            }
        } catch (error) {
            console.log(error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGNUP));
        }
    },
}