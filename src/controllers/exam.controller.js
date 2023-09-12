
const CustomError = require('../utils/custom-error');
const examValidator = require('../validations/exam.validation');

const Exam = require('../models/Exam.model');
const Group = require('../models/Group.model');
const ExamApply = require('../models/ExamApply.model');
const ExamResult = require('../models/ExamResult.model');
const { Op } = require('sequelize');

const create = async (req, res, next) => {
    try {
        const {name, minScore, end_time, group_id} = req.body;

        // Validation
        const resultValidation = await examValidator.create({name, minScore, end_time, group_id});
        if (resultValidation.error) { throw new CustomError(resultValidation.error.message, 400)};

        const newExam = await Exam.create({name, minScore, end_time, group_id});

        res.status(201).json({message: "Exam created successfully", data: newExam})

    } catch (error) {
        next(error);
    }
};

const getALl = async (req, res, next) => {
    try {
        
        const {fromScore, toScore, name} = req.query;
        
        const filter = {}
        if (name) {
            filter.name = {[Op.iLike]: `%${name}%`}
        }
        if (fromScore) {
            filter.minScore = {[Op.gt]: fromScore}
        }
        if (toScore) {
            filter.minScore = {[Op.lt]: toScore}
        }
        filter.status = true

        const models = [];
        const groups = await Group.findAll();
        if (groups.length) models.push({model: Group});
        const examapplys = await ExamApply.findAll();
        if (examapplys.length) models.push({model: ExamApply});
        const examresults = await ExamResult.findAll();
        if (examresults.length) models.push({model: ExamResult});

        const exams = await Exam.findAll({where: filter, include: models})
        res.status(200).json({message: "Success", data: exams})
    } catch (error) {
        next(error);
    }
};

const getOne = async (req, res, next) => {
    try {
        const {id} = req.params;

        const models = [];
        const groups = await Group.findAll();
        if (groups.length) models.push({model: Group});
        const examapplys = await ExamApply.findAll();
        if (examapplys.length) models.push({model: ExamApply});
        const examresults = await ExamResult.findAll();
        if (examresults.length) models.push({model: ExamResult});

        const findExam = await Exam.findOne({where: {id}, include: models})
        
        res.status(200).json({message: "Success", data: findExam});

    } catch (error) {
        next(error);
    }
};

const updateOne = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {name, minScore, end_time, group_id} = req.body;

        // Validation
        const resultValidation = await examValidator.create({name, minScore, end_time, group_id});
        if (resultValidation.error) { throw new CustomError(resultValidation.error.message, 400)};

        const updatedExam = await Exam.update({name, minScore, end_time, group_id}, {where: {id}});
        res.status(200).json({message: "Success", data: updatedExam});

    } catch (error) {
        next(error);
    }
};

const deleteOne = async (req, res, next) => {
    try {
        const {id} = req.params;
        const  deletedExam = await Exam.update({status: false}, {where: {id}});
        res.status(200).json({message: "Success", data: deletedExam});

    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    getALl,
    getOne,
    updateOne,
    deleteOne
}