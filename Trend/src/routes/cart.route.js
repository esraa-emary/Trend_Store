const express = require("express");
const router = express.Router();

const {
    addToCart,
    getCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart
} = require("../controllers/cart.controller.js");

const auth = require("../middlewares/auth.js");

router.use(auth);

router.post("/", addToCart);
router.get("/", getCart);
router.put("/:productId", updateCartItemQuantity);

// يحي - وضع المسار الثابت قبل المسار المتغير لمنع التداخل
router.delete("/clear", clearCart); // يحي 

// يحي - المسار الديناميكي الذي يحتوي على باراميتر يكون في النهاية
router.delete("/:productId", removeFromCart); // يحي

module.exports = router;