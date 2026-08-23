const Cart = require("../models/cart.model.js");
const Products = require("../models/products.model.js");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.addToCart = catchAsync(async (req, res, next) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // من التوكن مباشرة
    
    const product = await Products.findById(productId);
    if (!product) return next(new appError(404, "Product not found"));

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = await Cart.create({
            user: userId,
            cartItems: [{ product: productId, quantity: quantity || 1, price: product.price }]
        });
    } else {
        const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);
        
        if (itemIndex > -1) {
            cart.cartItems[itemIndex].quantity += (quantity || 1);
        } else {
            cart.cartItems.push({ product: productId, quantity: quantity || 1, price: product.price });
        }
    }

    cart.totalCartPrice = cart.cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    await cart.save();

    res.status(200).json({
        success: true,
        message: "Product added to cart",
        data: cart
    });
});