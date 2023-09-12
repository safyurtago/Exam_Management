const router = require('express').Router();


const isAuth = require('../middlewares/is-auth.middleware');
const isAdmin = require('../middlewares/is-admin.middleware');
const currentUser = require('../middlewares/current-user.middleware');
const { create, getALl, getOne, updateOne, deleteOne } = require('../controllers/exam.controller');


router.post('/exams', isAuth, currentUser, isAdmin, create);
router.get('/exams', isAuth, currentUser, isAdmin, getALl);   
router.get('/exams/:id', isAuth, currentUser, isAdmin, getOne);
router.put('/exams/update/:id', isAuth, currentUser, isAdmin, updateOne);
router.delete('/exams/delete/:id', isAuth, currentUser, isAdmin, deleteOne);


module.exports = router