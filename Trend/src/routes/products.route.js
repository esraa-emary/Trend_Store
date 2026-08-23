const { getAllProducts, getOneProduct, addProduct, updateProduct, hideProduct, getHiddenProducts } = require("../controllers/products.controller.js");
const router = require("express").Router()

router.route("/")
    .get(getAllProducts)
    .post(addProduct)

router.route("/hidden")
    .get(getHiddenProducts);

router.route("/:id")
    .get(getOneProduct)
    .patch(updateProduct)

router.route("/:id/hide")
    .patch(hideProduct);

module.exports = router