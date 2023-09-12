const router = require('express').Router();

const isAuth = require('../middlewares/is-auth.middleware');
const isAdmin = require('../middlewares/is-admin.middleware');
const currentUser = require('../middlewares/current-user.middleware');
const { create, getAll, getOne, updateOne, deleteOne } = require('../controllers/examresult.controller');

router.post('/results', isAuth, currentUser, isAdmin, create);
router.get('/results', isAuth, currentUser, isAdmin, getAll);
router.get('/results/:id', isAuth, currentUser, getOne);
router.put('/results/update/:id', isAuth, currentUser, isAdmin, updateOne);
router.delete('/results/delete/:id', isAuth, currentUser, isAdmin, deleteOne);

module.exports = router