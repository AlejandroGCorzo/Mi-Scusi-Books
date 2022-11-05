const { Router } = require('express');
const { protect } = require('../middleware/protect.js');
const Report = require('../models/reports.js');

const reportRouter = Router();

reportRouter.post('/', protect, async (req,res)=>{
    if(req.user){
        const { subject, description} = req.body
        if(!subject || !description) return res.status(400).send('Missing data!')
        try {
            const report = await Report.create({user : req.user._id, subject, description})
            res.send(report) 
        } catch (error) {
            res.status(400).send({error})
        }
    } else {
        res.send('Not authorized to send a report')
    }
})

reportRouter.get('/', protect, async (req,res)=>{
    if(req.user && (req.user.type === 'admin' || req.user.type === "seller")){
        try {
            const reports = await Report.find().populate('user')
            const allReports = reports.map(r => {
                return {
                    _id: r._id,
                    user : `${r.user.firstName} ${r.user.lastName}` ,
                    email: r.user.email,
                    rol: r.user.type,
                    subject: r.subject,
                    description: r.description
                }
            })
            res.send(allReports)
        } catch (error) {
            res.status(400).send({error})
        }
    } else {
        res.send('Not authorized to send a report')
    }
})

module.exports = reportRouter