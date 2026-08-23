const Products = require("../models/products.model.js");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// getall --nagham
exports.getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Products.find();
    res.status(200).json({
        status: "success",
        results: products.length,
        data: {
            products
        }
    });

});

// getone --samah
exports.getOneProduct = catchAsync(async (req, res, next) => {
    const product = await Products.findById(req.params.id);

    if (!product) return res.status(404).json({
        success: false,
        message: "no product found"
    })

    console.log(req.params);

    res.status(200).json({
        success: true,
        data: product
    });
})

// add --nagham
exports.addProduct = catchAsync(async (req, res, next) => {
    const newProduct = await Products.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            product: newProduct
        }
    });
})

// update --nagham
exports.updateProduct = catchAsync(async (req, res, next) => {
    const updateProduct = await Products.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!updateProduct) {
        return next(new appError("Product not found", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            product: updateProduct
        }
    });
})

// hide --samah
exports.hideProduct = catchAsync(async (req, res, next) => {
    const product = await Products.findByIdAndUpdate(
        req.params.id,
        {
            isDeleted: true,
            deletedAt: new Date()
        },
        {
            new: true
        }
    );

    if (!product) return res.status(404).json({
        success: false,
        message: "no product found"
    })

    res.status(200).json({
        success: true,
        data: product
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

    const products = await Products.find(filter);

    res.status(200).json({
        success: true,
        data: products
    });
})
