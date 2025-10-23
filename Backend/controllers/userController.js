import crypto from "crypto";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import sendToken from "../utils/jwtToken.js";
import { sendPasswordResetEmail, sendPasswordResetConfirmationEmail } from "../utils/emailService.js";

/* =========================================================
   🧍 REGISTER USER
========================================================= */
export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: "default-avatar.jpg",
    });

    sendToken(user, 201, res);
});

/* =========================================================
   🔐 LOGIN USER
========================================================= */
export const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are entered
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email & password", 400));
    }

    // Find user and include password field (select:false in model)
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    // Check password
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(user, 200, res);
});

/* =========================================================
   🚪 LOGOUT USER
========================================================= */
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});

/* =========================================================
   🧠 FORGOT PASSWORD
========================================================= */
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found with this email", 404));
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is:\n\n${resetUrl}\n\nIf you did not request this, please ignore.`;

    try {
        console.log("Message to be sent:", message);
        await sendPasswordResetEmail({
            email: user.email,
            name: user.name,
            subject: "Password Reset Request - DIVA",
            resetUrl: resetToken //resetUrl,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});

/* =========================================================
   🔁 RESET PASSWORD
========================================================= */
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    // Hash the token from URL
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler("Password reset token is invalid or expired", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400));
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined; //open
    user.resetPasswordExpire = undefined; //open


    await user.save();

    // sendToken(user, 200, res); //Don't use, we already are using reset confirm email token.

    try {
        console.log("*********************Message to be sent:", user.email);
        await sendPasswordResetConfirmationEmail({
            email: user.email,
            name: user.name,
            subject: "Your Password Has Been Successfully Reset",
        });

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`,
        });
    } catch (error) {
        // user.resetPasswordToken = undefined;
        // user.resetPasswordExpire = undefined;
        // await user.save({ validateBeforeSave: false });
        console.log("Error in sending confirmation email:", error);
        return next(new ErrorHandler(error, 500));
    }

});

/* =========================================================
   👤 GET USER PROFILE
========================================================= */
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

/* =========================================================
   🔑 UPDATE PASSWORD
========================================================= */
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    // Check previous password
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if (!isMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res);
});

/* =========================================================
   🧾 UPDATE PROFILE
========================================================= */
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        country: req.body.country,
    };

    if (req.body.avatar) newUserData.avatar = req.body.avatar;

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        user,
    });
});

/* =========================================================
   👑 ADMIN ROUTES
========================================================= */

// Get all users
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({ success: true, users });
});

// Get single user (admin)
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new ErrorHandler(`User not found`, 404));

    res.status(200).json({ success: true, user });
});

// Delete user (admin)
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) return next(new ErrorHandler(`User not found`, 404));

    await user.deleteOne();
    res.status(200).json({ success: true, message: "User deleted" });
});
