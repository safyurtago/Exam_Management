const Joi =  require('joi');

class examValidator {
    static async create ({name, minScore, end_time, group_id}) {
        const {error} = Joi.object({
            name: Joi.string().required(),
            minScore: Joi.number().required(),
            end_time: Joi.date().min("now").required(),
            group_id: Joi.number().required(),
        }).validate({name, minScore, end_time, group_id});
        if (error) {
            return {error};
        }
        else {
            return {error: false};
        }
    }
}

module.exports = examValidator;