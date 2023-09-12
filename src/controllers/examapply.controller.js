const {v4: uuid} = require('uuid');
const {extname} = require('path');

const CustomError = require('../utils/custom-error');
const examapplyValidator = require('../validations/examapply.validation');

const Student = require('../models/Student.model');
const Exam = require('../models/Exam.model');
const ExamApply = require('../models/ExamApply.model');

const create = async (req, res, next) => {
    try {
        const student_id = req.user.id;
        const {exam_id} = req.body;
        const file = req.files?.file;
        
        // Validation
        const resultValidation = await examapplyValidator.create({exam_id, file});
        if (resultValidation.error) { throw new CustomError(resultValidation.error.message, 400)};

        // Find Exam
        const findexam = await Exam.findOne({where: {id: exam_id}});
        if (!findexam.status) {throw new CustomError("Exam has already expired", 403)};

        const findexamapply = await ExamApply.findOne({where: {student_id, exam_id}})

        if (findexamapply) { throw new CustomError("You already applied for this exam", 403) };

        // Saving File
        const examPaper = uuid() + extname(file.name);
        file.mv(process.cwd() + '/uploads/' + examPaper);

        // Create new ExamApply
        const newexamapply = await ExamApply.create({exam_id, examPaper, student_id});

        res.status(201).json({message: 'Exam applied successfully', data: newexamapply})

    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getOneByStudent = async (req, res, next) => {
    try {
        const student_id = req.user.id
        const {id} = req.params;
        const models = [];

        const exams = await Exam.findAll();
        if (exams.length) models.push({model: Exam});
        const students = await Student.findAll();
        if (students.length) models.push({model: Student});

        const examapply = await ExamApply.findOne({where: {id, student_id}, include: models})
        if (!examapply) throw new CustomError("No exam applied for this exam or student", 403);

        res.status(200).json({message: "Success", data: examapply})

    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getAllByStudent = async (req, res, next) => {
    try {
        const student_id = req.user.id;

        const models = [];

        const exams = await Exam.findAll();
        if (exams.length) models.push({model: Exam});
        const students = await Student.findAll();
        if (students.length) models.push({model: Student});

        const examapplys = await ExamApply.findAll({where: {student_id}, include: models});
        
        res.status(200).json({message: "Success", data: examapplys});

    } catch (error) {
        next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const models = [];

        const exams = await Exam.findAll();
        if (exams.length) models.push({model: Exam});
        const students = await Student.findAll();
        if (students.length) models.push({model: Student});

        const examapplys = await ExamApply.findAll({include: models})
        res.status(200).json({message: "Success", data: examapplys})

    } catch (error) {
        next(error);
    }
};

const getOne = async (req, res, next) => {
    try {
        const {id} = req.params;
        const models = [];

        const exams = await Exam.findAll();
        if (exams.length) models.push({model: Exam});
        const students = await Student.findAll();
        if (students.length) models.push({model: Student});

        const examapply = await ExamApply.findAll({where: {id}, include: models})

        res.status(200).json({message: "Success", data: examapply});

    } catch (error) {
        next(error);
    }
};


const updateOne = async (req, res, next) => {
    try {
        const {id} = req.params;
        const student_id = req.user.id;
        const {exam_id} = req.body;
        const file = req.files?.file;
        
        // Validation
        const resultValidation = await examapplyValidator.create({exam_id, file});
        if (resultValidation.error) { throw new CustomError(resultValidation.error.message, 400)};

        // Find Exam
        const findexam = await Exam.findOne({where: {id: exam_id}});
        if (!findexam.status) {throw new CustomError("Exam has already expired", 403)};

        const findexamapply = await ExamApply.findOne({where: {student_id, exam_id}})

        if (findexamapply) { throw new CustomError("You already applied for this exam", 403) };

        // Saving File
        const examPaper = uuid() + extname(file.name);
        file.mv(process.cwd() + '/uploads/' + examPaper);

        // Create new ExamApply
        const updatedexamapply = await ExamApply.update({exam_id, examPaper, student_id}, {where: {id}});

        res.status(200).json({message: 'Examaply uptade successfully', data: updatedexamapply})
    } catch (error) {
        next(error);
    }
}

const deleteOne = async (req, res, next) => {
    try {
        const {id} = req.params;
        const deletedexamapply = await ExamApply.destroy({where: {id}})
        res.status(200).json({message: "Success", data: deletedexamapply})
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create,
    getAll,
    getOne,
    getAllByStudent,
    getOneByStudent,
    updateOne,
    deleteOne
}
