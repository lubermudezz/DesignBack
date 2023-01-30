const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('tasks', {
        id:{
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4

        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    },{timestamps: false})
}