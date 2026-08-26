const router = require("express").Router();
const auth = require("../middlewares/auth.js");
const { toggleWishlist, getWishlist } = require("../controllers/wishlist.controller.js");

router.use(auth);

router.route("/")
    .get(getWishlist)       // لعرض المفضلة
    .post(toggleWishlist);  // للـ Toggle (إضافة/إزالة في نفس الوقت)

module.exports = router;