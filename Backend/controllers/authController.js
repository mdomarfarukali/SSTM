import User from '../models/user.js';
// const User = require('../models/user');
import ErrorHandler from '../utils/errorHandler.js';
//const ErrorHandler = require('../utils/errorHandler');
// import sendEmail from '../utils/sendEmail.js';
// const sendEmail = require('../utils/sendEmail');
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';
// const catchAsyncErrors = require('../middleware/catchAsyncErrors');
import sendToken from '../utils/jwtToken.js';
// const sendToken = require('../utils/jwtToken');
import crypto from 'crypto';
// const crypto = require('crypto');

// Register a user => /api/auth/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, firstName, lastName, email, phone, password } = req.body;

  // Create user with all available fields
  const user = await User.create({
    name,
    firstName,
    lastName,
    email,
    phone,
    password,
    avatar: 'default-avatar.jpg'
  });

  sendToken(user, 201, res);
});

// Login user => /api/auth/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are entered by user
  if (!email || !password) {
    return next(new ErrorHandler('Please enter email & password', 400));
  }

  // Finding user in database
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Invalid Email or Password', 401));
  }

  // Check if password is correct
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Email or Password', 401));
  }

  sendToken(user, 200, res);
});

// Logout user => /api/auth/logout
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  // Use the same cookie options as when setting it, but with immediate expiration
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
    domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined
  });

  res.status(200).json({
    success: true,
    message: 'Logged out'
  });
});

// Forgot password => /api/auth/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('User not found with this email', 404));
  }

  // Get reset token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash and set to resetPasswordToken
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set token expire time
  user.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  // Create the reset URL
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

  // Import the email service
  const emailService = require('../utils/emailService');

  try {
    // Send the password reset email
    await emailService.sendPasswordResetEmail({
      to: user.email,
      name: user.name || user.firstName,
      resetUrl: resetUrl
    });

    res.status(200).json({
      success: true,
      message: 'Password reset instructions sent to your email'
    });
  } catch (error) {
    // If email sending fails, reset the token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler('Email could not be sent', 500));
  }
});

// Reset password => /api/auth/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(
      new ErrorHandler('Password reset token is invalid or has expired', 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Passwords do not match', 400));
  }

  // Setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get current user profile => /api/auth/me
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  });
});

// Update / Change password => /api/auth/password/update
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler('Old password is incorrect', 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

// Update user profile => /api/auth/me/update
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email
  };

  // In a real application, we would handle avatar upload

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    user
  });
});
