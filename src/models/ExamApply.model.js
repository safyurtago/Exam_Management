const {Sequelize, Model, DataTypes} = require('sequelize');

const sequelize = require('../database');

class ExamApply extends Model {};

ExamApply.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    examPaper: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    seen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
},
{
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "examapplys",
    modelName: "examapplys",
    freezeTableName: true, 
    sequelize,
});

module.exports = ExamApply;