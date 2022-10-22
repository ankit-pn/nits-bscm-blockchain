const mongoose = require('mongoose');

const vendorItemSchema = new mongoose.Schema({
    itemId: {
        type: String,
        required: [true, 'Please provide itemId']
    },
    quantity: {
        type: Number,
        required: [true, "Please provide Data"],
    },
    price: {
        type: Number,
        required: [true, "Please provide Data"],
    }
})

module.exports = mongoose.model.vendorItemList || mongoose.model('vendorItemList', vendorItemSchema);