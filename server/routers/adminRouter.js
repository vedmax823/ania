const Router = require('express').Router;
const router = new Router()
const {checkSchema} = require('express-validator');
const cakesController = require('../controllers/adminController/cakesController');

const categoryController = require('../controllers/adminController/categoryController')
const {category_check_schema} = require('../services/chek_schemas/admin_check_schemas/category-check-schemas')
const {cake_check_schema} = require('../services/chek_schemas/admin_check_schemas/cake-check-schemas')

router.post('/category', checkSchema(category_check_schema), categoryController.createNewCategory)
router.get('/category_list', categoryController.getCategotyList)
router.post('/newcake', checkSchema(cake_check_schema), cakesController.createNewCake)

module.exports = router