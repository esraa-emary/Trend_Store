const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User is required"],
        unique: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    }]
}, {
    timestamps: true,
    versionKey: false
});

const Wishlist = mongoose.model("wishlist", wishlistSchema);
module.exports = Wishlist;