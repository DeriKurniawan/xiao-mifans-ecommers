const User = require('../controllers/user');
const router = require('express').Router();
const veryfication = require('../helpers/token');

router.get('/', veryfication.adminOnly, User.getAllUser);
router.get('/:id', veryfication.adminAndUser, User.getOneUser);
router.post('/signup', User.signup);
router.post('/signin', User.signin);
router.put('/:id', veryfication.adminAndUser, User.updateUserData);
router.delete('/:id', veryfication.adminOnly, User.removeOneUser);

module.exports = router