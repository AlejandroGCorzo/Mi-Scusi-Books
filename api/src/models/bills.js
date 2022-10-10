const mongoose = require('mongoose');

const userShema = mongoose.Schema({

    books:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Books" 
    },
    amountBooks:[Number],
    price:[Number],
    total:Number,
    user:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: "User"
    }
    ,
    date:Date
})

module.exports = mongoose.model('Bills', userShema)