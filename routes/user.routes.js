const express = require("express");

const {
    getAllUsers,
    getOneUser
} = require("../controllers/user.controller");

const router = express.Router();


// GET All Users
router.get("/", getAllUsers);


// GET One User
router.get("/:id", getOneUser);


module.exports = router;