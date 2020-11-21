const { User } = require('../models');

module.exports = {
    checkIfExist: async(uuid) => {
        try{
            const alreadyUser = await User.findOne({
                where: {
                    uuid,
                }
            });
            return alreadyUser;
        } catch(error){
            throw error;
        }
    },
    createUser: async(uuid) =>{
        try{
            const user = await User.create({
                uuid: uuid,
            });
            return user;
        }catch(error){
            throw error;
        }
    },
};