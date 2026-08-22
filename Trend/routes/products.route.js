const { getAllProducts, getOneProduct, addProduct, updateProduct, hideProduct } = require("../controllers/products.controller.js");
const router = require("express").Router()

router.route("/")
.get(getAllProducts)
.post(addProduct)

router.route("/:id")
.get(getOneProduct)
.patch(updateProduct)
.delete(hideProduct)


// rout for the hided products --samah
router.patch("/:id/hide", hideProduct);


module.exports = router