const express = require('express');
const fileUpload = require('express-fileupload');

const sequelize = require('./database');
const config = require('../config');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');
require('./models/association');



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + '/uploads'));
app.use(fileUpload());

app.use('/api', routes);
app.use(errorHandler);

const sfr = async () => {

    await sequelize.authenticate({
        logging: false,
    });

    await sequelize.sync({
        logging: false,
        alter: true,
    });
    
    app.listen(config.port, () => {
        console.log('listening on port ' + config.port);
    });
};

sfr();