const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order_products: {
        type: Array,
        // item: {
        //     type: Array,
        //     required: true,
        //     product: {
        //         type: String
        //     },
        //     size: {
        //         type: Array,
        //         items: {
        //             type: String,
        //             enum: ["S", "M", "L"]
        //         }
        //     },
        //     quantity: {
        //         type: Number
        //     },
        //     note: {
        //         type: String
        //     }
        // },
        // quantity: {
        //     type: Number,
        //     required: true,
        // },
        // price: {
        //     type: Number,
        //     required: true,
        // },
        // avatar: {
        //     type: String,
        //     required: true
        // }
    },
    customer_name: {
        type: String,
        required: true,
    },
    customer_phone: {
        type: Number,
        required: true,
    },
    customer_address: {
        type: String,
        required: true,
    },
    customer_province: {
        type: String,
        required: true,
    },
    customer_district: {
        type: String,
        require: true
    },
    customer_wards: {
        type: String,
        required: true
    },
    order_pay: {
        type: String,
        required: true,
    },
    order_description: {
        type: String,
    },
    order_status: {
        type: Array,
        items: {
            type: String,
            enum: ["order", "shipped", "delivered"]
        }
    }
}, { timestamps: true })

module.exports = mongoose.model("orderModels", orderSchema)