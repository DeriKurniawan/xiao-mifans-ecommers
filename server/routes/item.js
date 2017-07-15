const Item = require('../controllers/item');
const veryfication = require('../helpers/token');
const router = require('express').Router();

router.get('/', Item.showAllItems);
router.get('/:id', Item.showOneItem);
router.get('/search/:search', Item.searchAllCategory);
router.get('/category/:category', Item.searchByCategory);
router.post('/', veryfication.adminAndUser, Item.createNewItem);
router.delete('/:id', veryfication.adminOnly, Item.removeOneItem);
router.put('/:id', Item.updateOneItem);
router.get('/search/:search', Item.showByKeyword);
router.get('category/:search', Item.showByCategory);

module.exports = router