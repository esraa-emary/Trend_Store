const Wishlist = require("../models/wishlist.model.js");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.toggleWishlist = catchAsync(async (req, res, next) => {
    // body من userId مؤقتاً بناخد الـ  Authentication لحد ما نظبط الـ 
    const { userId, productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
        wishlist = await Wishlist.create({ user: userId, products: [productId] });
    } else {
        const isExist = wishlist.products.includes(productId);
        if (isExist) {
            wishlist.products.pull(productId); // حذف لو موجود
        } else {
            wishlist.products.addToSet(productId); // إضافة لو مش موجود
        }
        await wishlist.save();
    }

    res.status(200).json({
        success: true,
        message: "Wishlist updated successfully",
        data: wishlist
    });
});