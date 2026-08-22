const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [50, "Name must not exceed 50 characters"],
        trim: true
    },

    age: {
        type: Number,
        required: [true, "Age is required"],
        min: [18, "Age must be at least 18"],
        max: [100, "Age must not exceed 100"]
    },

    phone: {
        type: String,
        required: [true, "Phone is required"],
        match: [/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number"]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"]
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    },

    isActive: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
        select: false
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;