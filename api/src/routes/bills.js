const { Router } = require("express");
const User = require("../models/user");
const Books = require("../models/books")
const axios = require("axios");
const { transporter } = require("../mailer/mailer");
const { protect } = require("../middleware/protect");

const billsRouter = Router();

billsRouter.post('/', async(req,res)=>{
    const {userId, books, amountBooks} = req.body;
    try {
        const user = await User.findById(userId);
        const booksDB = books.map(b => Books.find({ISBN : b.ISBN}))
    } catch (error) {
        res.status(400).send({error:error})
    }

})