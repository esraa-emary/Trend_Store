const express = require("express");
const User = require("../models/user.model");

const router = express.Router();

// Get All Users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            message: "Users fetched successfully",
            users
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// Get One User
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User fetched successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

module.exports = router;