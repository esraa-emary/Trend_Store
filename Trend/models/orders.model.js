const mongoose = require("mongoose")

const ordersSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User is required"]
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: [true, "User is required"]
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    isShipped: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
})

const Orders = mongoose.model("orders", ordersSchema)

module.exports = Orders