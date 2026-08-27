const { getAllProducts, getOneProduct, addProduct, updateProduct, hideProduct, getHiddenProducts, filterProducts } = require("../controllers/product.controller.js");
const auth = require("../middlewares/auth.js");
const restrictTo = require("../middlewares/restrictTo.js");
const router = require("express").Router()

// router.route("/")
//     .get(getAllProducts)
//     .post(restrictTo("admin"), addProduct)

// router.route("/hidden")
//     .get(restrictTo("admin"), getHiddenProducts);

// router.route("/filter/:category")
//     .get(filterProducts);

// router.route("/hide/:id")
//     .patch(restrictTo("admin"), hideProduct);

// router.route("/:id")
//     .get(getOneProduct)
//     .patch(restrictTo("admin"), updateProduct);

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