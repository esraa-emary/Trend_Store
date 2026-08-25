const mongoose = require("mongoose")

const ordersSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User is required"]
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: [true, "Product is required"]
            },
            quantity: {
                type: Number,
                required: [true, "Quantity is required"],
                min: 1
            }
        }
    ],
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

const Orders = mongoose.model("order", ordersSchema)

module.exports = Orders