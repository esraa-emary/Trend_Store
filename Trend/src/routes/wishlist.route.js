const router = require("express").Router();
const auth = require("../middlewares/auth");

const { toggleWishlist } = require("../controllers/wishlist.controller.js");

router.use(auth);
router.post("/", toggleWishlist);

module.exports = router;