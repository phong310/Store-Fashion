const mongoose = require('mongoose')

const shoeSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: false,
    },
    code: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    quantity: {
        type: Number,
        require: true
    },
    size: {
        type: Array,
        require: true,
    },
    img: {
        type: Array,
        require: true,
    },
    trending: {
        type: Boolean,
        require: true,
    },
    best_seller: {
        type: Boolean,
        require: true
    },
    rating: {
        type: Number,
        require: true,
    },
    date: {
        type: Date,
        require: false,
    },
    status: {
        type: String,
        require: true,
    },
    type:{
        type:String,
        require: true
    }
}, { timestamps: true })

shoeSchema.index({ name: 'text', code: 'text' });

module.exports = mongoose.model("ShoeModel", shoeSchema)
