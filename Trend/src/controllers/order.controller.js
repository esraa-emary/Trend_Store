const Order = require("../models/order.model.js");
const Product = require("../models/product.model.js");
const Cart = require("../models/cart.model.js");
const AppError = require("../utils/AppError.js");
const catchAsync = require("../utils/catchAsync.js");

exports.getAllOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find()
        .populate("user", "name email")
        .populate("products.product", "name price image");

    res.status(200).json({
        success: true,
        message: "Orders fetched successfully",
        totalOrders: orders.length,
        data: orders
    });
});

exports.getOneOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
        .populate("user", "name email")
        .populate("products.product", "name price image");

    if (!order) {
        return next(new AppError(404, `No order found with this id ${req.params.id}`));
    }

    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
        return next(new AppError(403, "You are not authorized to view this order"));
    }

    res.status(200).json({
        success: true,
        message: "Order fetched successfully",
        data: order
    });
});

exports.createOrderFromCart = catchAsync(async (req, res, next) => {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate("cartItems.product");

    if (!cart || cart.cartItems.length === 0) {
        return next(new AppError(400, "Your cart is empty"));
    }

    for (const item of cart.cartItems) {
        if (item.product.quantity < item.quantity) {
            return next(new AppError(400, `Not enough stock for product: ${item.product.name}`));
        }
    }

    const order = await Order.create({
        user: userId,
        products: cart.cartItems.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.price
        })),
        totalPrice: cart.totalCartPrice
    });

    for (const item of cart.cartItems) {
        await Product.findByIdAndUpdate(item.product._id, {
            $inc: { quantity: -item.quantity }
        });
    }

    await Cart.deleteOne({ user: userId });

    res.status(201).json({
        success: true,
        message: "Order created successfully from cart",
        data: order
    });
});

exports.shipOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new AppError(404, `No order found with this id ${req.params.id}`));
    }

    if (order.isShipped) {
        return next(new AppError(400, "Order is already shipped"));
    }

    // استخدام findByIdAndUpdate لتفادي مشاكل الـ Validation القديمة عند الـ save
    const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { isShipped: true },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        success: true,
        message: "Order shipped successfully",
        data: updatedOrder
    });
});

exports.getUserOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })
        .populate("products.product", "name price image");

    res.status(200).json({
        success: true,
        message: "User orders fetched successfully",
        totalOrders: orders.length,
        data: orders
    });
});