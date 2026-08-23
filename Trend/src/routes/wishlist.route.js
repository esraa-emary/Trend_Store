const router = require("express").Router();
const auth = require("../middlewares/auth");

// التعديل هنا: استوردنا الدالة الصح من ملف المفضلة
const { toggleWishlist } = require("../controllers/wishlist.controller.js");

router.use(auth); // حماية الـ Route
router.post("/", toggleWishlist);

module.exports = router;