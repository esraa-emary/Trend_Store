const Product = require("../models/product.model.js");
const AppError = require("../utils/AppError.js");
const catchAsync = require("../utils/catchAsync.js");

// getall --nagham
exports.getAllProducts = catchAsync(async (req, res, next) => {
    // جلب المنتجات التي لم يتم حذفها فقط
    const products = await Product.find({ isDeleted: false });
    
    res.status(200).json({
        status: "success",
        message: "Products fetched successfully",
        results: products.length,
        data: products
    });
});

// getone --samah
exports.getOneProduct = catchAsync(async (req, res, next) => {
    // التأكد من أن المنتج موجود وغير محذوف
    const product = await Product.findOne({ _id: req.params.id, isDeleted: false });

    if (!product) return next(new AppError(404, "No product found"));

    res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        data: product
    });
});

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

    const newProduct = await Product.create(req.body);
    
    res.status(201).json({
        status: "success",
        message: "Product added successfully",
        data: newProduct
    });
});

// update --nagham
exports.updateProduct = catchAsync(async (req, res, next) => {
    const updateProduct = await Product.findOneAndUpdate(
        { _id: req.params.id, isDeleted: false },
        req.body, 
        { new: true, runValidators: true }
    );
    
    if (!updateProduct) return next(new AppError(404, "Product not found"));

    res.status(200).json({
        status: "success",
        message: "Product updated successfully",
        data: updateProduct
    });
});

// hide --samah
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

    if (!product) return next(new AppError(404, "No product found"));

    res.status(200).json({
        success: true,
        message: "Product hidden successfully",
        data: product
    });
});

// restore --yahiya
exports.restoreProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            isDeleted: false,
            deletedAt: null
        },
        {
            new: true
        }
    ).select("+isDeleted +deletedAt");

    if (!product) return next(new AppError(404, "No hidden product found with this ID"));

    res.status(200).json({
        success: true,
        message: "Product restored successfully and returned to store",
        data: product
    });
});

// gethidden --esraa
exports.getHiddenProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find({ isDeleted: true }).select("+isDeleted +deletedAt");

    if (!products) return next(new AppError(404, "No product found"));

    res.status(200).json({
        success: true,
        message: "Hidden products fetched successfully",
        data: products
    });
});

// filter --samah
exports.filterProducts = catchAsync(async (req, res, next) => {
    const filter = {
        isDeleted: false
    };

    if (req.params.category) {
        filter.category = req.params.category;
    }

    const products = await Product.find(filter);

    res.status(200).json({
        success: true,
        message: "Products filtered successfully",
        data: products
    });
});