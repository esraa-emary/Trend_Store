const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [30, "Name must be below 30 characters"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password must be at least 6 characters"],
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        select: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    confirmOTP: {
        type: String,
        select: false
    },
    OTPExpire: {
        type: Date,
        select: false
    },
    resetToken: String
}, {
    timestamps: true,
    versionKey: false
});

const Users = mongoose.model("users", userSchema);
module.exports = Users;