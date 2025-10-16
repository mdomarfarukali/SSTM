
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const validator = require('validator');
// const jwt = require('jsonwebtoken');
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxLength: [50, 'Your name cannot exceed 50 characters']
  },
  firstName: {
    type: String,
    maxLength: [25, 'Your first name cannot exceed 25 characters']
  },
  lastName: {
    type: String,
    maxLength: [25, 'Your last name cannot exceed 25 characters']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email address']
  },  phone: {
    type: String,
    maxLength: [15, 'Phone number cannot exceed 15 characters']
  },
  address: {
    type: String,
    maxLength: [200, 'Address cannot exceed 200 characters']
  },
  city: {
    type: String,
    maxLength: [50, 'City name cannot exceed 50 characters'],
    default: 'Los Angeles'
  },
  state: {
    type: String,
    maxLength: [50, 'State name cannot exceed 50 characters'],
    default: 'California'
  },
  postalCode: {
    type: String,
    maxLength: [10, 'Postal code cannot exceed 10 characters'],
    default: '90025'
  },
  country: {
    type: String,
    maxLength: [50, 'Country name cannot exceed 50 characters'],
    default: 'United States'
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [6, 'Your password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    default: 'user',
    enum: {
      values: ['user', 'admin'],
      message: 'Please select correct role'
    }
  },
  avatar: {
    type: String,
    default: 'default-avatar.jpg'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
});

// Encrypting password before saving user
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token
userSchema.methods.getJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

export default mongoose.model('User', userSchema);