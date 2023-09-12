const Joi = require('joi');

class groupValidator {
    static async create ({name, subject}) {
        const {error} = Joi.object({
            name: Joi.string().required(),
            subject: Joi.string().required(),
        }).validate({name, subject});
        if (error) {
            return {error};
        }
        else {
            return {error: false};
        }
    }
}

module.exports = groupValidator;