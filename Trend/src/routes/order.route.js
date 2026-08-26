const express = require("express");
const router = express.Router();

const {
    getAllOrders,
    getOneOrder,
    createOrderFromCart,
    shipOrder,
    getUserOrders
} = require("../controllers/order.controller.js");

const auth = require("../middlewares/auth.js");
const restrictTo = require("../middlewares/restrictTo.js");

router.use(auth);

router.get("/my-orders", getUserOrders);

router.route("/")
    .get(restrictTo("admin"), getAllOrders)
    .post(createOrderFromCart);

router.route("/:id")
    .get(getOneOrder)
    .patch(restrictTo("admin"), shipOrder);

module.exports = router;