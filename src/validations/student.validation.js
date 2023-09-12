const Joi = require('joi');

class studentValidator {
    static async create ({fullname, username, password}) {
        const {error} = Joi.object({
            fullname: Joi.string().required(),
            username: Joi.string().required(),
            password: Joi.string().required()
        }).validate({fullname, username, password});
        if(error) {
            return {error};
        }
        else {
            return {error: false}
        }
    }
    static async login ({username, password}) {
        const {error} = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        }).validate({username, password});
        if (error) { 
            return {error};
        }
        else {
            return {error: false}
        }
    }
    static async update ({fullname, username}) {
        const {error} = Joi.object({
            fullname: Joi.string().required(),
            username: Joi.string().required(),
        }).validate({fullname, username});
        if (error) {
            return {error}
        }
        else {
            return {error: false}
        }
    }
}

module.exports = studentValidator;