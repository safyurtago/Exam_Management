const router = require('express').Router();

const isAuth = require('../middlewares/is-auth.middleware');
const isAdmin = require('../middlewares/is-admin.middleware');
const currentUser = require('../middlewares/current-user.middleware');
const { create, getALl, getOne, updateOne, deleteOne } = require('../controllers/group.controller');


router.post('/groups', isAuth, currentUser, isAdmin, create);
router.get('/groups', isAuth, currentUser, isAdmin, getALl);
router.get('/groups/:id', isAuth, currentUser, isAdmin, getOne);
router.put('/groups/update/:id', isAuth, currentUser, isAdmin, updateOne);
router.delete('/groups/delete/:id', isAuth, currentUser, isAdmin, deleteOne);


module.exports = router