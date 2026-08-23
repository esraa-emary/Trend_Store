const Wishlist = require("../models/wishlist.model.js");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.toggleWishlist = catchAsync(async (req, res, next) => {
    const { productId } = req.body;
    const userId = req.user._id; // من التوكن مباشرة

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
        wishlist = await Wishlist.create({ user: userId, products: [productId] });
    } else {
        const isExist = wishlist.products.includes(productId);
        if (isExist) {
            wishlist.products.pull(productId);
        } else {
            wishlist.products.addToSet(productId);
        }
        await wishlist.save();
    }

    res.status(200).json({
        success: true,
        message: "Wishlist updated successfully",
        data: wishlist
    });
});