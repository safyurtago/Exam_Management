const {Sequelize, Model, DataTypes} = require('sequelize');

const sequelize = require('../database');

class Group extends Model {};

Group.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
},
{
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "groups",
    modelName: "groups",
    freezeTableName: true, 
    sequelize,
});

module.exports = Group;