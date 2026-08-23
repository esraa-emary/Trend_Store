const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [30, "Name must be below 30 characters"],
    },
    price: {
        type: Number,
        required: true,
        min: [1, "Price must be a positive number"]
    },
    category: {
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    },
    deletedAt: {
        type: Date,
        select: false
    }
}, {
    timestamps: true,
    versionKey: false
})

const Products = mongoose.model("products", productSchema)

module.exports = Products