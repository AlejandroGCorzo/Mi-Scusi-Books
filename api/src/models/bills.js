const mongoose = require('mongoose');

const userShema = mongoose.Schema({

    books:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Books" 
    },
    amountBooks:{
        type:[Number],
        require:true
    },
    price:{
       type:[Number],
       require: true
    },
    total:{
       type:Number,
       require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    ,
    date:{
        type:Date,
        require:true
    }
})

module.exports = mongoose.model('Bills', userShema)