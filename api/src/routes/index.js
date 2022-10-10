const Router = require('express')

const router = Router();
const user = require('./user')

//middleware
router.use(Router.json())
router.use('/user',user)

module.exports = router;
