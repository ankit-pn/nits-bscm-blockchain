const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    userId:{
        type:String,
        required: [true,'Please provide userId']
    },
    itemId:{
        type:String,
        required: [true,'Please provide itemId']
    },
    quantity:{
        type:Number ,
        required: [true,"Please provide Data"],
    },
})

module.exports = mongoose.model.itemList || mongoose.model('itemList',itemSchema);