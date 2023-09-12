const Joi = require('joi');

class examapplyValidator {
    static async create ({exam_id, file}) {
        const {error} = Joi.object({
            exam_id: Joi.number().required(),
            file: Joi.required(),
        }).validate({exam_id, file});
        if (error) {
            return {error};
        }
        else {
            return {error: false};
        }
    }
}

module.exports = examapplyValidator;