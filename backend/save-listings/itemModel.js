const mongoose = require('mongoose');

const itemListSchema = new mongoose.Schema({
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
    available_quantity:{
        type:Number ,
        required: [true,"Please provide Data"],
    },
    require_quantity:{
        type:Number ,
        required: [true,"Please provide Data"],
    },
    vendor_address:{
        type:String,
        required: [true,"Please provide Address"],
    }
})

module.exports = mongoose.model.itemLList || mongoose.model('itemLList',itemListSchema);