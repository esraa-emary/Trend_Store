const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) =>   
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

const createSendToken = (user, statusCode, res) => {    
  const token = signToken(user._id);
  user.password = undefined;      
  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, phoneNumber } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return next(new AppError('Email already in use.', 400));

  const newUser = await User.create({ name, email, password, phoneNumber });
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password.', 400));
  }

  //in user's schema pass is set to null so we must use select + to retrieve it
  const user = await User.findOne({ email }).select('+password');

  if (!user || !user.password || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password.', 401));
  }

  if (!user.isActive) {
    return next(new AppError('This account has been deactivated.', 401));
  }

  createSendToken(user, 200, res);
});