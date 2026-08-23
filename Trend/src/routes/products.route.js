const { getAllProducts, getOneProduct, addProduct, updateProduct, hideProduct, getHiddenProducts, filterProducts } = require("../controllers/products.controller.js");
const router = require("express").Router()

router.route("/")
    .get(getAllProducts)
    .post(addProduct)

router.route("/hidden")
    .get(getHiddenProducts);

router.route("/filter/:category")
    .get(filterProducts);

router.route("/hide/:id")
    .patch(hideProduct);

router.route("/:id")
    .get(getOneProduct)
    .patch(updateProduct);

module.exports = router