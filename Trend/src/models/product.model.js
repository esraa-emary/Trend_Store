const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [30, "Name must be below 30 characters"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [1, "Price must be a positive number"]
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
        trim: true
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is required"],
        min: [0, "Quantity cannot be negative"],
        default: 0
    },
    image: {
        type: String,
        required: [true, "Product image is required"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        trim: true
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
});

productSchema.index({ name: 1, isDeleted: 1 }, { unique: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;