const { addToCart } = require("../controllers/cart.controller.js");
const router = require("express").Router();

router.route("/")
    .post(addToCart);

module.exports = router;