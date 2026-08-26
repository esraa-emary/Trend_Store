const User = require("../models/user.model.js");
const AppError = require("../utils/AppError.js");
const catchAsync = require("../utils/catchAsync.js");

// getall --ammar
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users
    });
})

// getone --ammar
exports.getOneUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new AppError(404, "User not found"));
    }

    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user
    });
})