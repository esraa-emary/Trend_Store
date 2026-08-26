const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // يفضل أيضاً جعله كابيتال ليتطابق مع موديل المستخدم
        required: [true, "User is required"],
        unique: true
    },
    cartItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product", // تم التعديل هنا ليطابق اسم الموديل الصحيح
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalCartPrice: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;