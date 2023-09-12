
const CustomError = require('../utils/custom-error');

const UserGroup = require('../models/UserGroup.model');
const Student = require('../models/Student.model');
const Group = require('../models/Group.model');

const create = async (req, res, next) => {
    try {
        const {student_id, group_id} = req.body;

        const findUserGroup = await UserGroup.findAll({where: {student_id, group_id}});

        if (findUserGroup.length) { throw new CustomError("User have already added to this group", 403); }

        const newUserGroup = await UserGroup.create({student_id, group_id});
    
        res.status(201).json({message: 'User added successfully', data: newUserGroup})

    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const {student_id, group_id} = req.query;

        const filter = {}
        if (student_id) {
            filter.student_id = student_id
        }
        if (group_id) {
            filter.group_id = group_id
        }

        const models = []
        const students = await Student.findAll();
        if (students.length) { models.push({model: Student}); }
        const groups = await Group.findAll();
        if (groups.length) { models.push({model: Group}); };
        
        const userGroups = await UserGroup.findAll({where: filter, include: models});

        res.status(200).json({message: "Success", data: userGroups});
    } catch (error) {
        next(error);
    }
};

const getOne = async (req, res, next) => {
    try {
        const {id} = req.params;

        const models = [];
        const students = await Student.findAll();
        if (students.length) { models.push({model: Student}); }
        const groups = await Group.findAll();
        if (groups.length) { models.push({model: Group}); }

        const findUserGroup = await UserGroup.findOne({where: {id}, include: models});

        res.status(200).json({message: 'Success', data: findUserGroup})
    } catch (error) {
        next(error);
    }
};


const deleteOne = async (req, res, next) => {
    try {
        const {id} = req.params;

        const deletedUserGroup = await UserGroup.destroy({where: {id}});

        res.status(200).json({message: 'Success', data: deletedUserGroup});
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    getAll,
    getOne,
    deleteOne
}