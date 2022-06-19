const interFaceController = require('../controllers/interFaceController')

const Router = require('express').Router
const router = new Router()

router.get('/categories', interFaceController.getCategories)

module.exports = router