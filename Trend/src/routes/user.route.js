const { getAllUsers, getOneUser } = require("../controllers/user.controller.js");
const auth = require("../middlewares/auth.js");
const restrictTo = require("../middlewares/restrictTo.js");
const router = require("express").Router();

// router.route("/")
//     .get(restrictTo("admin"), getAllUsers);

// router.route("/:id")
//     .get(getOneUser);

router.route("/")
    .get(getAllUsers);

router.route("/:id")
    .get(getOneUser);

module.exports = router