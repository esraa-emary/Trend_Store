const Product = require("../models/product.model.js");
const AppError = require("../utils/AppError.js");
const catchAsync = require("../utils/catchAsync.js");

// getall --nagham
exports.getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        status: "success",
        message: "products fetched successfully",
        results: products.length,
        data: products
    });

});
// getone --samah
exports.getOneProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) next(new AppError(404, `No product found`));

    console.log(req.params);

    res.status(200).json({
        success: true,
        message: "product fetched successfully",
        data: product
    });
})

// add --nagham
exports.addProduct = catchAsync(async (req, res, next) => {
    const {
        name,
        price,
        category,
        quantity,
        image,
        description
    } = req.body;

    if (!name || !price || !category || !quantity || !image || !description) {
        return next(new AppError(400, "Please provide name, price, category, quantity, image, and description"));
    }

    const newProduct = await Product.create(req.body)
    newProduct.isDeleted = undefined
    res.status(201).json({
        status: "success",
        message: "product added successfully",
        data: newProduct
    });
})

// update --nagham
exports.updateProduct = catchAsync(async (req, res, next) => {
    const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).select("+isDeleted +deletedAt");
    if (!updateProduct) return next(new AppError(404, "Product not found"));

    res.status(200).json({
        status: "success",
        message: "product updated successfully",
        data: updateProduct
    });
})

// hide --samah909999999999999999999999
exports.hideProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
       isDeleted: true,
            deletedAt: new Date()
        },
        {
            new: true
        }
    ).select("+isDeleted +deletedAt");

    if (!product) next(new AppError(404, `No product found`));

    res.status(200).json({
        success: true,
        message: "product hidden successfully",
        data: product
    });
})

// gethidden --esraa
exports.getHiddenProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find({ isDeleted: true }).select("+isDeleted +deletedAt");

    if (!products) next(new AppError(404, `No product found`));

    res.status(200).json({
        success: true,
        message: "hidded products fetched successfully",
        data: products
    });
})

//filter --samah
exports.filterProducts = catchAsync(async (req, res, next) => {
    const filter = {
        isDeleted: false
    };

    if (req.query.category) {
        filter.category = req.query.category;
    }

    const products = await Product.find(filter);

    res.status(200).json({
        success: true,
        message: "products filterd successfully",
        data: products
    });
})