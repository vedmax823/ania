const Router = require('express').Router

const router = new Router();
const userRouter = require('./userRouter')
const adminRouter = require('./adminRouter');
const checkRoleMiddleware = require('../middlewares/check-role-middleware');
const frontendRouter = require('../routers/frontendRouter')

router.use('/users', userRouter)
router.use('/admin', checkRoleMiddleware('ADMIN'), adminRouter)
router.use('/interface', frontendRouter)


module.exports = router

