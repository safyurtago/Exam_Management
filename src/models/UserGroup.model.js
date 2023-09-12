const {Sequelize, Model, DataTypes} = require('sequelize');

const sequelize = require('../database');

class UserGroup extends Model {};

UserGroup.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
},
{
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "usergroups",
    modelName: "usergroups",
    freezeTableName: true, 
    sequelize,
});

module.exports = UserGroup;