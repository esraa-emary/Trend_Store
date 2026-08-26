const Cart = require("../models/cart.model.js");
const Product = require("../models/product.model.js");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.addToCart = catchAsync(async (req, res, next) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    const qty = parseInt(quantity) || 1;
    if (qty < 1) {
        return next(new AppError(400, "Quantity must be at least 1"));
    }
    
    // يحي - التأكد أن المنتج موجود وغير محذوف
    const product = await Product.findOne({ _id: productId, isDeleted: false }); 
    if (!product) {
        return next(new AppError(404, "Product not found or hidden")); // يحي
    }

    let cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
        // يحي - التحقق من المخزون قبل إنشاء السلة
        if (qty > product.quantity) return next(new AppError(400, `Only ${product.quantity} items available`)); 
        
        cart = await Cart.create({
            user: userId,
            cartItems: [{ product: productId, quantity: qty, price: product.price }]
        });
    } else {
        const itemIndex = cart.cartItems.findIndex(
            item => item.product.toString() === productId
        );
        
        if (itemIndex > -1) {
            // يحي - التحقق من المخزون إذا كان المنتج موجوداً مسبقاً في السلة
            const newTotalQty = cart.cartItems[itemIndex].quantity + qty;
            if (newTotalQty > product.quantity) {
                return next(new AppError(400, `Not enough stock. You already have ${cart.cartItems[itemIndex].quantity} in cart.`));
            }
            cart.cartItems[itemIndex].quantity = newTotalQty;
        } else {
            // يحي - التحقق من المخزون للمنتج الجديد في السلة
            if (qty > product.quantity) return next(new AppError(400, `Only ${product.quantity} items available`));
            
            cart.cartItems.push({
                product: productId,
                quantity: qty,
                price: product.price
            });
        }
    }
    
    cart.totalCartPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );
    await cart.save();
    
    res.status(200).json({
        success: true,
        message: "Product added to cart successfully",
        data: cart
    });
});

exports.getCart = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    // يحي - إضافة populate لجلب بيانات المنتج (الاسم، السعر، الصورة، المخزون) لتظهر في الـ Frontend
    const cart = await Cart.findOne({ user: userId }).populate('cartItems.product', 'name price image quantity'); 
    
    if (!cart) {
        return next(new AppError(404, "Cart not found"));
    }
    res.status(200).json({
        success: true,
        data: cart
    });
});

exports.removeFromCart = catchAsync(async (req, res, next) => {
    const { productId } = req.params;
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
        return next(new AppError(404, "Cart not found"));
    }
    
    cart.cartItems = cart.cartItems.filter(
        item => item.product.toString() !== productId
    );
    
    if (cart.cartItems.length === 0) {
        await Cart.deleteOne({ user: userId });
        return res.status(200).json({
            success: true,
            message: "Cart is empty and has been deleted",
            data: null
        });
    }
    
    cart.totalCartPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );
    await cart.save();
    
    res.status(200).json({
        success: true,
        message: "Product removed from cart",
        data: cart
    });
});

exports.updateCartItemQuantity = catchAsync(async (req, res, next) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user._id;
    const qty = parseInt(quantity);
    
    if (!qty || qty < 1) {
        return next(new AppError(400, "Quantity must be at least 1"));
    }
    
    const cart = await Cart.findOne({ user: userId }).populate('cartItems.product', 'quantity name'); // يحي - جلب المخزون للتحقق
    
    if (!cart) {
        return next(new AppError(404, "Cart not found"));
    }
    
    const itemIndex = cart.cartItems.findIndex(
        item => item.product._id.toString() === productId // يحي - تعديل بسيط بسبب الـ populate
    );
    
    if (itemIndex === -1) {
        return next(new AppError(404, "Product not found in cart"));
    }

    // يحي - التحقق من المخزون عند تعديل الكمية
    if (qty > cart.cartItems[itemIndex].product.quantity) {
        return next(new AppError(400, `Only ${cart.cartItems[itemIndex].product.quantity} items available in stock`));
    }
    
    cart.cartItems[itemIndex].quantity = qty;
    
    cart.totalCartPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );
    await cart.save();
    
    res.status(200).json({
        success: true,
        message: "Cart item quantity updated",
        data: cart
    });
});

exports.clearCart = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
        return next(new AppError(404, "Cart not found"));
    }
    
    await Cart.deleteOne({ user: userId });
    
    res.status(200).json({
        success: true,
        message: "Cart cleared successfully",
        data: null
    });
});