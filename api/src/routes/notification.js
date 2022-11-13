const { Router } = require("express");
const User = require("../models/user");
const Books = require("../models/books");
const billsSchema = require("../models/bills");
const axios = require("axios");
const { transporter } = require("../mailer/mailer");
const { protect } = require("../middleware/protect");
const Notification = require("../models/notification");

const notificationRouter = Router();

notificationRouter.get('/', async(req,res)=> {
    try {
        const allNotification = await Notification.find()
        res.send(allNotification)
    } catch (error) {
        res.status(400).send({error, msg: 'Error en get a notification'})
    }
})
notificationRouter.post('/', protect, async(req,res)=> {
    const {type} = req.body
    const date = new Date()
    // const idUser = req.user
    const user = await User.findById(req.user)
    try {
        const notification = await Notification.create({
            type,
            user: {
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
                image: user.image
            },
            date: date.toDateString()
        })
        res.send(notification)
    } catch (error) {
        res.status(400).send({error, msg: 'Error en post a notification'})
    }
})

notificationRouter.put('/', protect, async (req,res)=>{
    const {idNoti,idAdmin} = req.body;
    try {
        const idUser=(req.user._id.valueOf());
        const notification = await Notification.findById(idNoti)
        const newAdmin = notification.admin //array de admin que vieron
        // if(newAdmin.some((id)=>id===idUser)) return res.status(400).send("Ya lo vio")
        newAdmin.push(idAdmin)
        await notification.updateOne({admin:newAdmin})
        res.send(newAdmin)
    } catch (error) {
        res.status(400).send({error, msg: 'Error en put a notification'})
    }
})

notificationRouter.get('/id', protect, async (req,res)=>{
    const idAdmin = req.user._id.valueOf()
    try {
        const allNoti = await Notification.find().limit(20)
        const adminNoti = allNoti.map(noti => {
            if(!noti.admin.includes(idAdmin)) return noti
        })
        res.send(adminNoti)
    } catch (error) {
        res.status(400).send({error, msg: 'Error en get/id a notification'})
    }
})

module.exports = notificationRouter;
