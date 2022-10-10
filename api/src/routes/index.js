const Router = require('express')

const router = Router();
const user = require('./user')
const category = require('./category')
const review = require('./review')
//middleware
router.use(Router.json())
router.use('/user',user)
router.use('/category', category)
router.use('/review', review)
module.exports = router;
