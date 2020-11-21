const jwt = require('../modules/jwt');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');


const authUtil = {
    checkToken: async (req, res, next) => {
        var token = req.headers.jwt;
        if (!token) {
            return res.statusCode(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.EMPTY_TOKEN));
        }

        const user = await jwt.verify(token);
        if (user === TOKEN_EXPIRED) {
            return res.statusCode(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.EXPIRED_TOKEN));
        }
        if (user === TOKEN_INVALID) {
            return res.statusCode(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN));
        }
        if (user === undefined) {
            return res.statusCode(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN));
        }
        req.decoded = user;
        next();
    }
}
module.exports = authUtil;