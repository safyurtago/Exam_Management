const {Op} = require('sequelize');

const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const {bcryptHash, bcryptCompare} = require('../utils/bcrypt');

const CustomError = require('../utils/custom-error');
const studentValidator = require('../validations/student.validation');

const Student = require('../models/Student.model');
const UserGroup = require('../models/UserGroup.model');
const ExamApply = require('../models/ExamApply.model');
const ExamResult = require('../models/ExamResult.model');



const create = async (req, res, next) => {
    try {
        const {fullname, username, password} = req.body;
        
        // Validation
        const resultValidation = await studentValidator.create({fullname, username, password});
        if (resultValidation.error) { throw new CustomError(resultValidation.error.message, 400)}

        // Find Username 
        const findStudent = await Student.findOne({where: {username}})
        if (findStudent) { throw new CustomError("Username already exists", 403) };

        // Password Hashing
        const hashedPassword = await bcryptHash(password);

        // Create student
        const newStudent = await Student.create({fullname, username, password: hashedPassword});
        
        // send response
        res.status(201).json({message: 'Student created successfully', data: newStudent})

    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const {username, password } = req.body;
        // Validation
        const resultValidation = await studentValidator.login({username, password});
        if (resultValidation.error) { throw new CustomError(resultValidation.error.message, 400)};

        // Find Student
        const student = await Student.findOne({where: {username}});
        if (!student) { throw new CustomError("username not found", 404) };

        // Checking Password

        if (!(await bcryptCompare(password, student.password))) { throw new CustomError("Wrong Password or Username", 401) };

        // Create Token
        const token = jwt.generateToken({id: student.id});

        res.status(200).json({message: "You logged in successfully", token});

    } catch (error) {
        next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const {name, isPassed, isFailed} = req.query;

        // Filter students
        const filter = {};
        if (name) {
            filter.fullname = {[Op.iLike]: `%${name}%`};
        }
        if (isPassed) {
            filter.passed = true;
        }
        if (isFailed) {
            filter.passed = false;
        }
        
        // Filter students with Models
        const models = [];

        const usergroups = await UserGroup.findAll();
        if (usergroups.length) {models.push({model: UserGroup})};

        const examApplys = await ExamApply.findAll();
        if (examApplys.length) {models.push({model: ExamApply})};

        const examResults = await ExamResult.findAll();
        if (examResults.length) {models.push({model: ExamResult})}


        const students = await Student.findAll({where: filter, include: models});

        res.status(200).json({message: "Success", students});

    } catch (error) {
        next(error);
    }
};
const getOne = async (req, res, next) => {
    try {
        const {id} = req.params;
        
        // Filter student with Models
        const models = [];

        const groups = await Group.findAll();
        if (groups.length) {models.push({model: Group})};

        const examApplys = await ExamApply.findAll();
        if (examApplys.length) {models.push({model: ExamApply})};
        
        const examResults = await ExamResult.findAll();
        if (examResults.length) {models.push({model: ExamResult})}

        const student = await Student.findOne({where: {id}, include: models});

        res.status(200).json({message: "Success", student});

    } catch (error) {
        next(error);
    }
};
const updateOne = async (req, res, next) => {
    try {
        const {id} = req.params;      
        const {fullname, username} = req.body;

        // Validation
        const resultValidation = await studentValidator.update({fullname, username});
        if (resultValidation.error) { throw new CustomError(resultValidation.error.message, 400)};

        const updatedStudent = await Student.update({fullname, username}, {where: {id}});

        res.status(200).json({message: "Success", updatedStudent});

    } catch (error) {
        next(error);
    }
};

const updatePassword = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {oldPassword, newPassword, confirmPassword} = req.body;

        if (newPassword != confirmPassword) { throw new CustomError("Passwords must match", 400); }
        if (oldPassword == newPassword) { throw new CustomError("Passwords must be different", 400); }

        const findStudent = await Student.findByPk(id);
        if (!( await bcryptCompare(oldPassword, findStudent.password))) { throw new CustomError("Old password did not match", 400); }

        const newHashedPassword = await bcryptHash(newPassword);
        await Student.update({password: newHashedPassword}, {where: {id}});
        res.status(200).json({message: "Success"})

    } catch (error) {
        next(error);
    }
};

const deleteOne = async (req, res, next) => {
    try {
        const {id} = req.params;
        const deletedStudent = await Student.destroy({where: {id}});
        res.status(200).json("Success");
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    login,
    getAll,
    getOne,
    updateOne,
    deleteOne,
    updatePassword
}