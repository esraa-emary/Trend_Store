const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User is required"],
        unique: true // كل يوزر ليه سلة واحدة نشطة
    },
    cartItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: { // بنسجل السعر وقت الإضافة للسلة عشان لو سعر المنتج اتغير بعدين
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

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
