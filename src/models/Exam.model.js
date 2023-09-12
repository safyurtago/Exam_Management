const {Sequelize, Model, DataTypes} = require('sequelize');

const sequelize = require('../database');

class Exam extends Model {};

Exam.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    minScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
{
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "exams",
    modelName: "exams",
    freezeTableName: true, 
    sequelize,
});

module.exports = Exam;