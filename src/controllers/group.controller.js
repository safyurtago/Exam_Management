

const CustomError = require('../utils/custom-error');
const groupValidator = require('../validations/group.validation');

const Group = require('../models/Group.model');
const UserGroup = require('../models/UserGroup.model');
const Exam = require('../models/Exam.model');
const { Op } = require('sequelize');

const create = async (req, res, next) => {
    try {
        const {name, subject} = req.body;
        
        // Validation
        const resultValidation = await groupValidator.create({name, subject});
        if (resultValidation.error) { throw new CustomError(resultValidation.error.message, 400)};

        // Check Group
        const findGroup = await Group.findOne({where: {name}});
        if (findGroup) { throw new CustomError("Group already exists", 403); };

        const newGroup = await Group.create({name, subject});

        res.status(201).json({message: 'Group created successfully', data: newGroup});

    } catch (error) {
        next(error);
    }
};

const getALl = async (req, res, next) => {
    try {
        const {name, subject} = req.query;

        const filter = {};
        if (subject) {
            filter.subject = {[Op.iLike]: `%${subject}%`}
        }
        if (name) {
            filter.name = {[Op.iLike]: `%${name}%`}
        }
        filter.status = true;

        const models = [];
        const usergroups = await UserGroup.findAll();
        if (usergroups.length) { models.push({model: UserGroup}); };
        const exams = await Exam.findAll();
        if (exams.length) { models.push({model: Exam}); };

        const groups = await Group.findAll({where: filter, include: models})
        res.status(200).json({message: "Success", data: groups});

    } catch (error) {
        next(error);
    }
};

const getOne = async (req, res, next) => {
    try {
        const {id} = req.params;

        const models = [];
        
        const usergroups = await UserGroup.findAll();
        if (usergroups.length) { models.push({model: UserGroup}); };
        const exams = await Exam.findAll();
        if (exams.length) { models.push({model: Exam}); };

        const group = await Group.findOne({where: {id}, include: models})
        res.status(200).json({message: "Success", data: group})
    } catch (error) {
        next(error);
    }
};

const updateOne = async (req, res, next) => {
    try {
        const {name, subject} = req.body;
        const {id} = req.params;
        // Validation
        const resultValidation = await groupValidator.create({name, subject});
        if (resultValidation.error) { throw new CustomError(resultValidation.error.message, 400)};

        const updatedGroup = await Group.update({name, subject}, {where: {id}});
        res.status(200).json({message: "Success", data: updatedGroup});

    } catch (error) {
        next(error);
    }
};

const deleteOne = async (req, res, next) => {
    try {
        const {id} = req.params;
        const deletedGroup = await Group.update({status: false},{where: {id}})
        res.status(200).json({message: 'Success', data: deletedGroup});

    } catch (error) {
        console.log(error);
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