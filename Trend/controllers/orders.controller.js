const Orders = require("../models/orders.model.js");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllOrders = catchAsync(async (req, res, next) => {

})

exports.getOneOrder = catchAsync(async (req, res, next) => {

})

// add --esraa
exports.addOrder = catchAsync(async (req, res, next) => {
    const order = await Orders.create(req.body);
    res.status(200).json({
        success: true,
        message: "Order added successfully",
        data: order
    })
})

// ship --esraa
exports.shipOrder = catchAsync(async (req, res, next) => {
    const order = await Orders.findById(req.params.id);
    if (!order) return next(new appError(404, `No order found with this id ${req.params.id}`));

    order.isShipped = true;
    await order.save();

    res.status(200).json({
        success: true,
        message: "Order accepted successfully",
        data: order
    })
})

exports.getUserOrders = catchAsync(async (req, res, next) => {

})