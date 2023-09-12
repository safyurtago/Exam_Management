const {Sequelize, Model, DataTypes, ENUM} = require("sequelize");

const sequelize = require('../database');

class Student extends Model {};

Student.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fullname:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
    },    
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    seen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    passed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        // allowNull: false,
        defaultValue: false,
    }
},
{
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "students",
    modelName: "students",
    freezeTableName: true,
    sequelize,
});

module.exports = Student;

// insert into students (fullname, username, password, admin, created_at, updated_at) values ('Shahroz Gulliyev', 'safyur', 'safyur', true, '2023-09-11 12:14:01.859197+05', '2023-09-11 12:14:01.859197+05');