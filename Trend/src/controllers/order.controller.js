const Order = require("../models/order.model.js");
const Product = require("../models/product.model.js");
const AppError = require("../utils/AppError.js");
const catchAsync = require("../utils/catchAsync.js");

// getall --yahia
exports.getAllOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find()
        .populate("user", "name email")
        .populate("products.product", "name price image");

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
        .populate("products.product", "name price image");

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
        products
    } = req.body;

    if (!user || !products || !Array.isArray(products) || products.length === 0) {
        return next(new AppError(400, "Please provide user id and products array with items."));
    }

    const productIds = products.map(item => item.product);
    const dbProducts = await Product.find({ _id: { $in: productIds } });

    if (dbProducts.length !== productIds.length) {
        return next(new AppError(400, "One or more products not found."));
    }

    const total = products.reduce((total, item) => {
        const dbProduct = dbProducts.find(p => p._id.toString() === item.product.toString());
        return total + (dbProduct.price * item.quantity);
    }, 0);

    const order = await Order.create({
        user: req.user._id,
        products: products,
        totalPrice: total
    });

    res.status(201).json({
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
        .populate("products.product", "name price image");

    res.status(200).json({
        success: true,
        message: "Order fetched successfully",
        totalOrders: orders.length,
        data: orders
    })
})