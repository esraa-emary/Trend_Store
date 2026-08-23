const express = require("express");
const router = express.Router();
const { getAllOrders, getOneOrder, addOrder, shipOrder, getUserOrders } = require("../controllers/orders.controller.js");
const auth = require("../middlewares/auth");
const restrictTo = require("../middlewares/restrictTo");

// تطبيق الحماية على جميع مسارات الأوردرات
router.use(auth);

// مسار أوردرات اليوزر الحالي
router.get("/my-orders", getUserOrders);

router.route("/")
    .get(restrictTo("admin"), getAllOrders) // الآدمن فقط يشوف كل الطلبات
    .post(addOrder);

router.route("/:id")
    .get(getOneOrder)
    .patch(restrictTo("admin"), shipOrder); // الآدمن فقط يقبل الشحن

module.exports = router;