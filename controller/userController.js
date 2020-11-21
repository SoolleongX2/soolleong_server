const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const responseMessage = require('../modules/responseMessage');
const {
    User
} = require('../models');
const {
    userService
} = require('../service');
const jwt = require('../modules/jwt');


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
                return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, {
                    token
                }));
            } else {
                const user = await userService.createUser(uuid);
                const {
                    token
                } = await jwt.sign(user);
                console.log(`token:${token}`);
                return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_UP_SUCCESS, {
                    token, 
                    user
                }));
            }
        } catch (error) {
            console.log(error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGNUP));
        }
    },
}