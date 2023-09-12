const {Sequelize, Model, DataTypes} = require('sequelize');

const sequelize = require('../database');

class ExamResult extends Model {};

ExamResult.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
{
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "examresults",
    modelName: "examresults",
    freezeTableName: true, 
    sequelize,
});

module.exports = ExamResult;