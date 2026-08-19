const { getAllOrders, getOneOrder, addOrder, acceptOrder, rejectOrder, getUserOrders } = require("../controllers/orders.controller.js");
const router = require("express").Router()

router.route("/")
    .get(getAllOrders)
    .post(addOrder)

router.route("/:id")
    .get(getOneOrder)
    .patch(acceptOrder)
    .delete(rejectOrder)

router.route("/user/:userId")
    .get(getUserOrders)

module.exports = router