const router = require("express").Router();
const auth = require("../middlewares/auth");
const { addToCart } = require("../controllers/cart.controller.js");

router.use(auth);

router.post("/", addToCart);

module.exports = router;