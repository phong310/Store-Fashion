const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: String,
        required: true
    },
    img: String,
    quantity: {
        type: Number,
        required: true
    },
    size: {
        type: Array,
        required: true,
        items: {
            type: String,
            enum: ["S", "M", "L"]
        }
    },
    notes: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model("cartModels", cartSchema)