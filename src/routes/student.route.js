const router = require('express').Router();

const isAuth = require('../middlewares/is-auth.middleware');
const isAdmin = require('../middlewares/is-admin.middleware');
const currentUser = require('../middlewares/current-user.middleware');
const { create, login, getAll, getOne, updateOne, deleteOne, updatePassword } = require('../controllers/student.controller');


router.post('/students/create', isAuth, currentUser, isAdmin, create);
router.post('/students/login', login);
router.get('/students', isAuth, currentUser, isAdmin, getAll);
router.get('/students/:id', isAuth, currentUser, isAdmin, getOne);
router.put('/students/update/:id', isAuth, currentUser, isAdmin, updateOne);
router.put('/students/updatePassword/:id', isAuth, currentUser, isAdmin, updatePassword); 
router.delete('/students/delete/:id', isAuth, currentUser, isAdmin, deleteOne);



module.exports = router