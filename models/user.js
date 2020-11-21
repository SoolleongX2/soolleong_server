module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        uuid : {
            type : DataTypes.STRING(200),
            allowNull : false,
            unique : true,
        },
    },{
        freezeTableName : true,
        timestamps : false,
    })
}