const mongoose = require('mongoose');

const periodSchema = new mongoose.Schema({
    userId:{
        type:String,
        required: [true,'Please provide userId']
    },
    date:{
        type:String ,
        required: [true,"Please provide Data"],
        unique: [true,"Note/Mark Already Exist on that date"]
    },
    note:{
        type:String,
        required: [true,"Please provide Note"]
    }
})

module.exports = mongoose.model.periodList || mongoose.model('periodList',periodSchema);