
const CustomError = require('../utils/custom-error');
const examresultValidator = require('../validations/examresult.validation');
const checkTimeDiff = require('../utils/timeDiff');

const ExamApply = require('../models/ExamApply.model');
const ExamResult = require('../models/ExamResult.model');
const Exam = require('../models/Exam.model');
const Student = require('../models/Student.model');

const create = async (req, res, next) => {
    try {
        let {examapply_id, score} = req.body;
        
        const resultValidation = await examresultValidator.create({examapply_id, score});
        if (resultValidation.error) { throw new CustomError(resultValidation.error.message, 400); }

        const [findExamApply] = await ExamApply.findAll({where: {id: examapply_id}})
        if (!findExamApply) { throw new CustomError("No Exam Applays were found", 403) };
        
        const [findExamResult] = await ExamResult.findAll({where: {examapply_id}});
        if (findExamResult) { throw new CustomError("Already Checked for Exam Apply", 403) }

        const exam = await Exam.findOne({where: {id: findExamApply.exam_id}})
        const sutdent = await Student.findOne({where: {id: findExamApply.student_id}})

        // Check time difference
        if (exam.end_time - findExamApply.created_at < 0) {
            let diff = await checkTimeDiff(exam.end_time, findExamApply.created_at);
            if (diff >= 100) {
                score = 0
            }
            else if (Math.floor(diff / 5)*5 > score) {
                score = 0
            } 
            else {
                score -= Math.floor(diff / 5) * 5;
            }
        }
        
        if (exam.minScore < score) {
            await Student.update({passed: true}, {where: {id: sutdent.id}})
        }

        const newExamResult = await ExamResult.create({examapply_id, score});

        res.status(201).json({message: "Success", data: newExamResult})

    } catch (error) {
        next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const models = [];
        const examapplys = await ExamApply.findAll();

        if (examapplys.length) models.push({model: ExamApply, include: [{model: Exam}, {model: Student}]})

        const findExamResults = await ExamResult.findAll({include: models});

        res.status(200).json({message: "Success", data: findExamResults})
    } catch (error) {
        next(error);
    }
};

const getOne = async (req, res, next) => {
    try {
        const {id} = req.params;
        
        const models = [];
        const examapplys = await ExamApply.findAll();

        if (examapplys.length) models.push({model: ExamApply, include: [{model: Exam}, {model: Student}]})

        const findExamResult = await ExamResult.findAll({where: {id}, include: models});

        res.status(200).json({message: "Success", data: findExamResult})
    } catch (error) {
        next(error);
    }
};

const updateOne = async (req, res, next) => {
    try {
        const {id} = req.params;
        let {examapply_id, score} = req.body;
        
        const resultValidation = await examresultValidator.create({examapply_id, score});
        if (resultValidation.error) { throw new CustomError(resultValidation.error.message, 400); }

        const [findExamApply] = await ExamApply.findAll({where: {id: examapply_id}})
        if (!findExamApply) { throw new CustomError("No Exam Applays were found", 403) };
        
        const [findExamResult] = await ExamResult.findAll({where: {examapply_id}});
        if (findExamResult) { throw new CustomError("Already Checked for Exam Apply", 403) }

        const exam = await Exam.findOne({where: {id: findExamApply.exam_id}})
        const sutdent = await Student.findOne({where: {id: findExamApply.student_id}})

        // Check time difference
        if (exam.end_time - findExamApply.created_at > 0) {
            let diff = await checkTimeDiff(exam.end_time, findExamApply.created_at);
            if (diff >= 100) {
                score = 0
            }
            else if (Math.floor(diff / 5)*5 > score) {
                score = 0
            } 
            else {
                score -= Math.floor(diff / 5) * 5;
            }
        }
        
        if (exam.minScore < score) {
            await Student.update({passed: true}, {where: {id: sutdent.id}})
        }

        const newExamResult = await ExamResult.update({examapply_id, score}, {where: {id}});

        res.status(200).json({message: "Success", data: newExamResult})
    } catch (error) {
        next(error);
    }
};

const deleteOne = async (req, res, next) => {
    try {
        const {id} = req.params;
        await ExamResult.destroy({where: {id}})
        res.status(200).json({message: "Success"})
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    getAll,
    getOne,
    updateOne,
    deleteOne
}