const Router = require('express').Router;
const router = new Router()
const {checkSchema} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware')

const userController = require('../controllers/userController')
const {login_check_schema, registration_check_schema} = require('../services/chek_schemas/validation_check_schema')

router.post('/registration',
            checkSchema(registration_check_schema),
            userController.registration)
router.post('/login',
            checkSchema(login_check_schema),
            userController.login)
router.get('/refresh',
            //checkSchema(refresh_check_schema),
            userController.refresh)

router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/users', authMiddleware, userController.getUsers)

module.exports = router