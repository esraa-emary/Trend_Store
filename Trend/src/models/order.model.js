const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // تم تعديلها لتكون كابيتال لضمان التوافق مع موديل المستخدم
        required: [true, "User is required"]
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product", // تم تعديلها لتصبح "Product" بالمفرد والكابيتال تماماً مثل ملف الـ product.model.js
                required: [true, "Product is required"]
            },
            quantity: {
                type: Number,
                required: [true, "Quantity is required"],
                min: 1
            },
            price: { // أضفناها هنا لضمان حفظ السعر وقت الطلب بشكل صحيح
                type: Number,
                required: true
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
});

const Orders = mongoose.model("Order", ordersSchema); // اسم الموديل "Order"

module.exports = Orders;