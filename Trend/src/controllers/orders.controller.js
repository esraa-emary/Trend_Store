const Orders = require("../models/orders.model.js");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllOrders = catchAsync(async (req, res, next) => {
    const orders = await Orders.find()
        .populate("user", "name email")
        .populate("product", "name price image");

    res.status(200).json({
        success: true,
        totalOrders: orders.length,
        data: orders
    });
});

exports.getOneOrder = catchAsync(async (req, res, next) => {
    const order = await Orders.findById(req.params.id)
        .populate("user", "name email")
        .populate("product", "name price image");

    if (!order) return next(new appError(404, `No order found with this id ${req.params.id}`));

    res.status(200).json({
        success: true,
        data: order
    });
});

exports.addOrder = catchAsync(async (req, res, next) => {
    // اليوزر بيتحدد تلقائياً من التوكن
    const order = await Orders.create({
        ...req.body,
        user: req.user._id
    });

    res.status(201).json({
        success: true,
        message: "Order added successfully",
        data: order
    });
});

exports.shipOrder = catchAsync(async (req, res, next) => {
    const order = await Orders.findById(req.params.id);
    if (!order) return next(new appError(404, `No order found with this id ${req.params.id}`));

    order.isShipped = true;
    await order.save();

    res.status(200).json({
        success: true,
        message: "Order accepted successfully"
    });
});

// يرجع أوردرات اليوزر المسجل حالياً
exports.getUserOrders = catchAsync(async (req, res, next) => {
    const orders = await Orders.find({ user: req.user._id })
        .populate("product", "name price image");

    res.status(200).json({
        success: true,
        totalOrders: orders.length,
        data: orders
    });
});

//--------------------------------
// old code
// const Orders = require("../models/orders.model.js");
// const appError = require("../utils/appError");
// const catchAsync = require("../utils/catchAsync");

// exports.getAllOrders = catchAsync(async (req, res, next) => {//yaya edit
//     const orders = await Orders.find()
//         .populate("user", "name email")
//         .populate("product", "name price image")

//     res.status(200).json({
//         success : true ,
//         totalOrders : orders.length ,
//         data : orders
//     })
// })

// exports.getOneOrder = catchAsync(async (req, res, next) => { // yaya edit
//     const order = await Orders.findOne({ _id : req.params.id })
//         .populate("user", "name email")
//         .populate("product", "name price image")

//     if (!order) return next(new appError(404, `No order found with this id ${req.params.id}`))

//     res.status(200).json({
//         success : true ,
//         data : order
//     })
// })
// // add ---esraa
// exports.addOrder = catchAsync(async (req, res, next) => {
//     const order = await Orders.create(req.body);
//     res.status(200).json({
//         success: true,
//         message: "Order added successfully"
//     })
// })

// // ship --esraa
// exports.shipOrder = catchAsync(async (req, res, next) => {
//     const order = await Orders.findById(req.params.id);
//     if (!order) return next(new appError(404, `No order found with this id ${req.params.id}`));

//     order.isShipped = true;
//     await order.save();

//     res.status(200).json({
//         success: true,
//         message: "Order accepted successfully"
//     })
// })

// exports.getUserOrders = catchAsync(async (req, res, next) => { //yaya edit
//     const orders = await Orders.find({ user: req.params.userId }) .populate("product", "name price image"); 
//     res.status(200).json({
//         success : true ,
//         totalOrders : orders.length ,
//         data : orders
//     });
// });