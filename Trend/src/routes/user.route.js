const { getAllUsers, getOneUser } = require("../controllers/user.controller.js");
const auth = require("../middlewares/auth.js");
const restrictTo = require("../middlewares/restrictTo.js");
const router = require("express").Router();

// 1. حماية الملف كله بـ auth أو تطبيقها على الـ routes اللي محتاجة تسجيل دخول
router.use(auth); // <-- ضيف السطر ده هنا عشان يفعل الـ auth لكل مسارات الـ users

router.route("/")
    .get(restrictTo("admin"), getAllUsers);

router.route("/:id")
    .get(getOneUser);

module.exports = router;