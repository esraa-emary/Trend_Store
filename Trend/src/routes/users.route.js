const { getAllUsers, getOneUser, addUser} = require("../controllers/users.controller.js");
const router = require("express").Router()

router.route("/")
.get(getAllUsers)
.post(addUser)

router.route("/:id")
.get(getOneUser)

module.exports = router