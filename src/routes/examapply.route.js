const router = require('express').Router();

const isAuth = require('../middlewares/is-auth.middleware');
const isAdmin = require('../middlewares/is-admin.middleware');
const currentUser = require('../middlewares/current-user.middleware');
const { create, getAll, getOne, getAllByStudent, getOneByStudent, updateOne, deleteOne } = require('../controllers/examapply.controller');


router.post('/examapplys', isAuth, currentUser, create);
router.get('/student/examapplys', isAuth, currentUser, getAllByStudent);
router.get('/student/examapplys/:id', isAuth, currentUser, getOneByStudent);

router.get('/examapplys', isAuth, currentUser, isAdmin, getAll);
router.get('/examapplys/:id', isAuth, currentUser, isAdmin, getOne);
router.put('/examapplys/update/:id', isAuth, currentUser, isAdmin, updateOne);
router.delete('/examapplys/delete/:id', isAuth, currentUser, isAdmin, deleteOne);


module.exports = router