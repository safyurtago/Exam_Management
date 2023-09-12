const {Sequelize} = require('sequelize');

const config = require('../../config');

const sequelize = new Sequelize({
    dialect: 'postgres',
    port: config.db_port || 5432,
    host: config.db_host || 'localhost',
    username: config.db_username || 'postgres',
    password: config.db_password || 'admin',
    database: config.db_name || 'exam_management',
});

module.exports = sequelize;