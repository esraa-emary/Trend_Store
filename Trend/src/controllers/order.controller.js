const Order = require("../models/order.model.js");
const AppError = require("../utils/AppError.js");
const catchAsync = require("../utils/catchAsync.js");

// getall --yahia
exports.getAllOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find()
        .populate("user", "name email")
        .populate("product", "name price image");

    res.status(200).json({
        success: true,
        message: "Orders fetched successfully",
        totalOrders: orders.length,
        data: orders
    })
})

// getone --yahia
exports.getOneOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
        .populate("user", "name email")
        .populate("product", "name price image");

    if (!order) return next(new AppError(404, `No order found with this id ${req.params.id}`))

    res.status(200).json({
        success: true,
        message: "Order fetched successfully",
        data: order
    })
})

// add --esraa
exports.addOrder = catchAsync(async (req, res, next) => {
    const {
        user,
        product,
        quantity
    } = req.body;

    if (!user || !product || !quantity) {
        return next(new AppError(400, "Please provide user id, product id, and quantity."));
    }

    const order = await Order.create({
        ...req.body,
        user: req.user._id
    });

    res.status(200).json({
        success: true,
        message: "Order added successfully",
        data: order
    })
})

// ship --esraa
exports.shipOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) return next(new AppError(404, `No order found with this id ${req.params.id}`));

    order.isShipped = true;
    await order.save();

    res.status(200).json({
        success: true,
        message: "Order accepted successfully",
        data: order
    })
})

// getuserorders --yahia
exports.getUserOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })
        .populate("product", "name price image");

    res.status(200).json({
        success: true,
        message: "Order fetched successfully",
        totalOrders: orders.length,
        data: orders
    })
})