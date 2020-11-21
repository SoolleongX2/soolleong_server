module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Goal', {
        alcoholType : {
            type: DataTypes.INTEGER,
            allowNull : false,
        },
        alcoholCount : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
    }, {
        freezeTableName : true,
        timestamps : true,
    })
}