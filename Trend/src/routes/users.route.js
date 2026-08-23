const { getAllUsers, getOneUser } = require("../controllers/users.controller.js");
const router = require("express").Router();

router.route("/")
    .get(getAllUsers);

router.route("/:id")
    .get(getOneUser);

module.exports = router