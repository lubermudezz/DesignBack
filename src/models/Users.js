const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('users', {
        id:{
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4

        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },{timestamps: false})
}