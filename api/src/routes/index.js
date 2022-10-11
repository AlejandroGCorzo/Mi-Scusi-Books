const Router = require('express')

const router = Router();
const user = require('./user')
const category = require('./category')
const review = require('./review')
const books = require('./books')
//middleware
router.use(Router.json())
router.use('/user',user)
router.use('/category', category)
router.use('/review', review)
router.use('/books', books)



module.exports = router;
