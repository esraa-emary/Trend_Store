const { getAllProducts, getOneProduct, addProduct, updateProduct, hideProduct, getHiddenProducts, filterProducts, restoreProduct } = require("../controllers/product.controller.js");
const auth = require("../middlewares/auth.js");
const restrictTo = require("../middlewares/restrictTo.js");
const router = require("express").Router()

router.route("/")
    .get(getAllProducts)
    .post(restrictTo("admin"), addProduct)

router.route("/hidden")
    .get(restrictTo("admin"), getHiddenProducts);

router.route("/restore/:id")
    .patch(restrictTo("admin"), restoreProduct);

router.route("/filter/:category")
    .get(filterProducts);

router.route("/hide/:id")
    .patch(restrictTo("admin"), hideProduct);

router.route("/:id")
    .get(getOneProduct)
    .patch(restrictTo("admin"), updateProduct);

module.exports = router