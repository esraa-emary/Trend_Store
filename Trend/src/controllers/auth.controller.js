const jwt = require("jsonwebtoken");

const User = require("../models/users.model");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


// Create JWT
const signToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );
};


// Send JWT + User
const createSendToken = (user, statusCode, res) => {

  const token = signToken(user._id);

  // Don't send password to client
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user
    }
  });
};


// Register / Signup
exports.register = catchAsync(async (req, res, next) => {

  const {
    name,
    email,
    password,
    phoneNumber
  } = req.body;


  // Validate required fields
  if (!name || !email || !password) {

    return next(
      new appError(
        400,
        "Please provide name, email and password."
      )
    );
  }


  // Check if email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {

    return next(
      new appError(400,
        "Email already in use."
      )
    );
  }


  // Create user
  const newUser = await User.create({
    name,
    email,
    password,
    phoneNumber
  });


  // Send token
  createSendToken(
    newUser,
    201,
    res
  );
});


// Login
exports.login = catchAsync(async (req, res, next) => {

  const {
    email,
    password
  } = req.body;


  // Check email and password
  if (!email || !password) {

    return next(
      new appError(400,
        "Please provide email and password."
      )
    );
  }


  // Password has select:false
  // So we explicitly select it here
  const user = await User
    .findOne({ email })
    .select("+password");


  // User doesn't exist
  if (!user) {

    return next(
      new appError(401,
        "Incorrect email or password."
      )
    );
  }


  // Compare password
  const isCorrectPassword =
    await user.correctPassword(
      password,
      user.password
    );


  if (!isCorrectPassword) {

    return next(
      new appError(401,
        "Incorrect email or password."
      )
    );
  }


  // Check account status
  if (!user.isActive) {

    return next(
      new appError(401,
        "This account has been deactivated."
      )
    );
  }


  // Send JWT
  createSendToken(
    user,
    200,
    res
  );
});