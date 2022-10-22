const mongoose = require('mongoose');

const itemHistorySchema = new mongoose.Schema({
    userId:{
        type:String,
        required: [true,'Please provide userId']
    },
    itemId:{
        type:String,
        required: [true,'Please provide itemId']
    },
    price:{
        type:Number,
        required: [true,'Please provide itemId']
    },
    quantity:{
        type:Number ,
        required: [true,"Please provide Data"],
    },
    date:{
        type:"String",
        require:[true,"Please provide Data"],
    },
    transaction_hash:{
        type:String,
        required: [true,"Please provide Address"],
    }
})

module.exports = mongoose.model.itemHistory || mongoose.model('itemHistory',itemHistorySchema);