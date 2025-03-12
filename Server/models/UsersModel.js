const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    avatar: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    confirm: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    Role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    wishList: {
        type: Array,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("UsersModel", userSchema)