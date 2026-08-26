const Wishlist = require("../models/wishlist.model.js");
const AppError = require("../utils/AppError.js");
const catchAsync = require("../utils/catchAsync.js");

exports.toggleWishlist = catchAsync(async (req, res, next) => {
    const { productId } = req.body;
    const userId = req.user._id;

    let wishlist = await Wishlist.findOne({ user: userId });
    let isExist = false; // عرفناه هنا في الأول

    if (!wishlist) {
        wishlist = await Wishlist.create({ user: userId, products: [productId] });
        isExist = false;
    } else {
        isExist = wishlist.products.includes(productId);
        if (isExist) {
            wishlist.products.pull(productId);
        } else {
            wishlist.products.addToSet(productId);
        }
        await wishlist.save();
    }

    await wishlist.populate("products", "name price image quantity");

    res.status(200).json({
        success: true,
        message: isExist ? "Product removed from wishlist" : "Product added to wishlist successfully",
        data: wishlist
    });
});

exports.getWishlist = catchAsync(async (req, res, next) => {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products", "name price image quantity");

    if (!wishlist || wishlist.products.length === 0) {
        return next(new AppError(404, "Your wishlist is empty"));
    }

    res.status(200).json({
        success: true,
        data: wishlist
    });
});