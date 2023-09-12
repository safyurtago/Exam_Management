const router = require('express').Router();

const isAuth = require('../middlewares/is-auth.middleware');
const isAdmin = require('../middlewares/is-admin.middleware');
const currentUser = require('../middlewares/current-user.middleware');
const { create, getAll, getOne, deleteOne } = require('../controllers/usergroup.controller');


router.post('/usergroups', isAuth, currentUser, isAdmin, create);
router.get('/usergroups', isAuth, currentUser, isAdmin, getAll);
router.get('/usergroups/:id', isAuth, currentUser, isAdmin, getOne );
router.delete('/usergroups/delete/:id', isAuth, currentUser, isAdmin, deleteOne);

module.exports = router