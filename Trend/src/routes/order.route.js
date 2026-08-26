const { getAllOrders, getOneOrder, addOrder, shipOrder, getUserOrders } = require("../controllers/order.controller.js");
const auth = require("../middlewares/auth.js");
const restrictTo = require("../middlewares/restrictTo.js");
const router = require("express").Router()

// router.use(auth);

// router.get("/my-orders", getUserOrders);

// router.route("/")
//     .get(restrictTo("admin"), getAllOrders)
//     .post(addOrder);

// router.route("/:id")
//     .get(getOneOrder)
//     .patch(restrictTo("admin"), shipOrder);


router.get("/my-orders", getUserOrders);

router.route("/")
    .get(getAllOrders)
    .post(addOrder);

router.route("/:id")
    .get(getOneOrder)
    .patch(shipOrder);

module.exports = router