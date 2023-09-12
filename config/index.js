require('dotenv/config');

const {env} = process;

const config = {
    port: env.PORT,
    jwt_secret: env.JWT_SECRET_KEY,
    db_port: env.DB_PORT,
    db_host: env.DB_HOST,
    db_username: env.DB_USERNAME,
    db_password: env.DB_PASSWORD,
    db_name: env.DB_NAME,

};

module.exports = config;