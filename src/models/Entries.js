const { DataTypes} = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('entries', {
        id:{
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4

        },
        hours: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        approved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },

    },{timestamps: false})
}