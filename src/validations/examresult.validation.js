const Joi = require('joi');

class examresultValidator {
    static async create ({examapply_id, score}) {
        const {error} = Joi.object({
            examapply_id: Joi.number().required(),
            score: Joi.number().required(),
        }).validate({examapply_id, score});
        if (error) {
            return {error};
        }
        else {
            return {error: false};
        }
    }
}

module.exports = examresultValidator;