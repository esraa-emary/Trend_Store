const User = require("../models/user.model");

// Get All Users
const getAllUsers = async (req, res) => {
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
};


// Get One User
const getOneUser = async (req, res) => {
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
};

module.exports = {
    getAllUsers,
    getOneUser
};