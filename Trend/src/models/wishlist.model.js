const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // تأكد إنه "User" كابيتال
        required: [true, "User is required"],
        unique: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product" // تأكد إنه "Product" كابيتال ومفرد
    }]
}, {
    timestamps: true,
    versionKey: false
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;