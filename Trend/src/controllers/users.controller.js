const Users = require("../models/users.model.js");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// getall ---ammar
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await Users.find();

    res.status(200).json({
        message: "Users fetched successfully",
        users
    });
})

// getone ---ammar
exports.getOneUser = catchAsync(async (req, res, next) => {
    const user = await Users.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json({
        message: "User fetched successfully",
        user
    });
})

// add ---esraa
exports.addUser = catchAsync(async (req, res, next) => {
    const user = await Users.create(req.body);
    res.status(200).json({
        success: true,
        message: "User added successfully"
    })
})