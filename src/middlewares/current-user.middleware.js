const { QueryTypes } = require('sequelize');
const sequelize = require('../database');
const  CustomError  = require('../utils/custom-error');

const currentUser = async (req, res, next) => {
  try {
    const {
      verify: {id},
    } = req;
    const [user] = await sequelize.query("SELECT * FROM students WHERE id = (:id)", {
      replacements: {id},
      type: QueryTypes.SELECT
    })
    if (!user) { return res.status(403).json({message: 'Unathorized'}) }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = currentUser;
