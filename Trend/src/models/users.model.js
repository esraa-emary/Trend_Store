const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: [3, "Name must be at least 3 characters"],
            maxLength: [30, "Name must be below 30 characters"],
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minLength: [6, "Password must be at least 6 characters"],
            select: false
        },

        phoneNumber: {
            type: String,
            trim: true
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
            select: false
        },

        isActive: {
            type: Boolean,
            default: true
        },

        confirmOTP: {
            type: String,
            select: false
        },

        OTPExpire: {
            type: Date,
            select: false
        },

        resetToken: {
            type: String,
            select: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);


// Hash password before saving user
userSchema.pre("save", async function (next) {

    // If password was not modified, don't hash it again
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);

    next();
});


// Compare entered password with hashed password
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};


const User = mongoose.model("User", userSchema);

module.exports = User;