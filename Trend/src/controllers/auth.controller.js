const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { promisify } = require("util")
const crypto = require("crypto")
const { customAlphabet } = require("nanoid")
const User = require("../models/user.model")
const AppError = require("../utils/AppError")
const catchAsync = require("../utils/catchAsync")
const sendEmail = require("../utils/sendEmail")
const template = require("../utils/emailTemplate")
const jwtSign = promisify(jwt.sign)

// signtoken --mohammed
// Create JWT
const signToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );
};

// token --mohammed
// Send JWT + User
const createSendToken = (user, statusCode, res) => {

  const token = signToken(user._id, user.role);

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

// signup --mohammed
exports.signup = catchAsync(async (req, res, next) => {

  const {
    name,
    email,
    password,
    phoneNumber
  } = req.body;


  // Validate required fields
  if (!name || !email || !password) {

    return next(
      new AppError(
        400,
        "Please provide name, email and password."
      )
    );
  }


  // Check if email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {

    return next(
      new AppError(400,
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

// login --mohammed
exports.login = catchAsync(async (req, res, next) => {

  const {
    email,
    password
  } = req.body;


  // Check email and password
  if (!email || !password) {

    return next(
      new AppError(400,
        "Please provide email and password."
      )
    );
  }


  // Password has select:false
  // So we explicitly select it here
  const user = await User
    .findOne({ email })
    .select("+password +role");


  // User doesn't exist
  if (!user) {

    return next(
      new AppError(401,
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
      new AppError(401,
        "Incorrect email or password."
      )
    );
  }


  // Check account status
  if (!user.isActive) {

    return next(
      new AppError(401,
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

// confirm --yahia
exports.confirmEmail = catchAsync(async (req, res, next) => {
  const { email, confirmOTP } = req.body
  // check if email is exist 
  const findUser = await User.findOne({ email }).select("+confirmOTP")
  if (!findUser) return next(new AppError(400, "This is email isn't exist please signup"))
  // check if email is active 
  if (findUser.isActive) return next(new AppError(400, 'This email is already active'))
  // check otp 
  const check = await bcrypt.compare(confirmOTP, findUser.confirmOTP)
  if (!check || !confirmOTP || findUser.OTPExpire < Date.now()) return next(new AppError(400, 'Invalid OR Expired OTP'))
  findUser.isActive = true
  findUser.confirmOTP = undefined
  findUser.OTPExpire = undefined
  await findUser.save()
  res.status(200).json({
    success: true,
    message: 'Email is confirmed Successfully'
  })
})

// forget --yahia
exports.forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body
  const findUser = await User.findOne({ email })
  if (!findUser) return next(new AppError(400, 'This user is not found'))
  const resetToken = await crypto.randomBytes(32).toString("hex")
  findUser.resetToken = resetToken
  await findUser.save()
  const link = `http://localhost:3000/auth/reset-password/${resetToken}`
  sendEmail(email, "reset password link", template(link, findUser.name, "Reset Link"))
  res.status(200).json({
    success: true,
    message: "Reset link is sent to email"
  })
})

// reset --yahia
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params
  const { password } = req.body
  const findUser = await User.findOne({ resetToken: token })
  if (!findUser) return next(new AppError(400, 'The reset token is invalid or expired'))
  if (!password || password.length < 6) {
    return next(new AppError(400, 'Password must 6 char or more'))
  }
  const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUND)
  findUser.password = hashedPassword
  findUser.resetToken = undefined
  await findUser.save()
  res.status(200).json({
    success: true,
    message: 'Password reset successfully'
  })
})