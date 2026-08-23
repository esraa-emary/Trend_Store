const { toggleWishlist } = require("../controllers/wishlist.controller.js");
const router = require("express").Router();

router.route("/")
    .post(toggleWishlist);

module.exports = router;