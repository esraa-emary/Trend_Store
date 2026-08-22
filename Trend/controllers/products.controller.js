const Products = require("../models/products.model.js");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res, next) => {

})
// getone --samah
exports.getOneProduct = catchAsync(async (req, res, next) => {
        const product = await Products.findById(req.params.id);
    
    if(!product) return res.status(404).json({
        success :false,
        message:"no product found"
    })

    console.log(req.params);

    res.status(200).json({
        success: true,
        data: product
    });
})

exports.addProduct = catchAsync(async (req, res, next) => {

})

exports.updateProduct = catchAsync(async (req, res, next) => {

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

    if(!product) return res.status(404).json({
        success :false,
        message:"no product found"
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

    if(req.query.category){
        filter.category = req.query.category;
    }

    const products = await Products.find(filter);

    res.status(200).json({
        success: true,
        data: products
    });
})
