import express from 'express';
// const express = require('express');
import { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile } from '../controllers/authController.js';
// const { 
//   registerUser, 
//   loginUser, 
//   logoutUser, 
//   forgotPassword, 
//   resetPassword, 
//   getUserProfile, 
//   updatePassword, 
//   updateProfile 
// } = require('../controllers/authController');
// const { isAuthenticatedUser } = require('../middleware/auth');
import { isAuthenticatedUser } from '../middleware/auth.js';
// const router = express.Router();
import router from express.Router();
// const router = express.Router();
// const { 
//   registerUser, 
//   loginUser, 
//   logoutUser, 
//   forgotPassword, 
//   resetPassword, 
//   getUserProfile, 
//   updatePassword, 
//   updateProfile 
// } = require('../controllers/authController');
// const { isAuthenticatedUser } = require('../middleware/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

// module.exports = router;
export default router;