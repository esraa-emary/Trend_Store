const { getAllOrders, getOneOrder, addOrder, shipOrder, getUserOrders } = require("../controllers/orders.controller.js");
const router = require("express").Router()

router.route("/user/:userId")
    .get(getUserOrders);

router.route("/")
    .get(getAllOrders)
    .post(addOrder)

router.route("/:id")
    .get(getOneOrder)
    .patch(shipOrder)

module.exports = router