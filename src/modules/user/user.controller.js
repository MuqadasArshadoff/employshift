import { ApiError } from "../../core/utils/api-error.js";
import { ApiResponse } from "../../core/utils/api-response.js";
import { asyncHandler } from "../../core/utils/async-handler.js";
import User from "../../models/User.model.js";
import {
    userForgotPasswordMailBody,
    userVerificationMailBody,
} from "../../shared/constants/mail.constant.js";
import { mailTransporter } from "../../shared/helpers/mail.helper.js";
import { storeAccessToken, storeLoginCookies } from "../../shared/helpers/cookies.helper.js";
import crypto from "crypto";

/* ======================================================
   📍 REGISTER USER
====================================================== */
const registerUser = asyncHandler(async (req, res) => {
    const { userName, userEmail, userPassword, userRole } = req.body;

    const existingUser = await User.findOne({ userEmail });
    if (existingUser) throw new ApiError(400, "User already exists");



    const user = await User.create({
        userName,
        userEmail,
        userPassword,
        userRole,
    });

    if (!user) throw new ApiError(400, "User not created");

    // Generate verification token
    const { unHashedToken, hashedToken, tokenExpiry } =
        user.generateTemporaryToken();

    user.userVerificationToken = hashedToken;
    user.userVerificationTokenExpiry = tokenExpiry;
    await user.save();

    // Send verification email
    const verifyLink = `${process.env.BASE_URL}/api/v1/users/verify/${unHashedToken}`;

    await mailTransporter.sendMail({
        from: process.env.MAILTRAP_SENDEREMAIL,
        to: userEmail,
        subject: "Verify your email",
        html: userVerificationMailBody(userName, verifyLink),
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                userName: user.userName,
                userEmail: user.userEmail,
                userRole: user.userRole,
            },
            "User registered successfully. Verify your email."
        )
    );
});

/* ======================================================
   📍 LOGIN USER
====================================================== */
const logInUser = asyncHandler(async (req, res) => {
    const { userEmail, userPassword } = req.body;

    const user = await User.findOne({ userEmail });
    if (!user) throw new ApiError(400, "User not found");

    const isPasswordCorrect = await user.isPasswordCorrect(userPassword);
    if (!isPasswordCorrect) throw new ApiError(400, "Invalid password");

    if (!user.userIsVerified)
        throw new ApiError(400, "Please verify your email first");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    storeLoginCookies(res, accessToken, refreshToken, "user");

    user.userRefreshToken = refreshToken;
    await user.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user: {
                    userName: user.userName,
                    userEmail: user.userEmail,
                    userRole: user.userRole,
                },
                tokens: { accessToken, refreshToken },
            },
            "User logged in successfully"
        )
    );
});


/* ======================================================
   📍 LOGOUT USER
====================================================== */
const logoutUser = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    if (!userId) throw new ApiError(401, "User not authenticated");

    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    user.userRefreshToken = null;
    await user.save();

    res.clearCookie("userAccessToken");
    res.clearCookie("userRefreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

/* ======================================================
   📍 VERIFY EMAIL
====================================================== */
const verifyUserMail = asyncHandler(async (req, res) => {
    const { token } = req.params;
    if (!token) throw new ApiError(400, "Token missing");

    const hashed = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        userVerificationToken: hashed,
        userVerificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) throw new ApiError(400, "Invalid or expired verification token");

    user.userIsVerified = true;
    user.userVerificationToken = null;
    user.userVerificationTokenExpiry = null;

    await user.save();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Email verified successfully"));
});

/* ======================================================
   📍 REFRESH ACCESS TOKEN
====================================================== */
const getAccessToken = asyncHandler(async (req, res) => {
    const { userRefreshToken } = req.cookies;
    if (!userRefreshToken) throw new ApiError(400, "Refresh token missing");

    const user = await User.findOne({ userRefreshToken });
    if (!user) throw new ApiError(400, "Invalid refresh token");

    const accessToken = user.generateAccessToken();
    await storeAccessToken(res, accessToken, "user");

    return res.status(200).json(
        new ApiResponse(
            200,
            { accessToken },
            "New access token generated successfully"
        )
    );
});

/* ======================================================
   📍 SEND FORGOT PASSWORD EMAIL
====================================================== */
const forgotPasswordMail = asyncHandler(async (req, res) => {
    const { userEmail } = req.body;

    const user = await User.findOne({ userEmail });
    if (!user) throw new ApiError(400, "User not found");

    const { unHashedToken, hashedToken, tokenExpiry } =
        user.generateTemporaryToken();

    user.userPasswordResetToken = hashedToken;
    user.userPasswordExpirationDate = tokenExpiry;

    await user.save();

    const resetLink = `${process.env.BASE_URL}/api/v1/users/reset-password/${unHashedToken}`;

    await mailTransporter.sendMail({
        from: process.env.MAILTRAP_SENDEREMAIL,
        to: userEmail,
        subject: "Reset your password",
        html: userForgotPasswordMailBody(user.userName, resetLink),
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { resetLink },
                "Password reset link sent successfully"
            )
        );
});

/* ======================================================
   📍 RESET PASSWORD
====================================================== */
const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { userPassword } = req.body;

    const hashed = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        userPasswordResetToken: hashed,
        userPasswordExpirationDate: { $gt: Date.now() },
    });

    if (!user)
        throw new ApiError(400, "Invalid or expired password reset token");

    user.userPassword = userPassword;
    user.userPasswordResetToken = null;
    user.userPasswordExpirationDate = null;

    await user.save();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password reset successfully"));
});

export {
    registerUser,
    verifyUserMail,
    logInUser,
    logoutUser,
    getAccessToken,
    forgotPasswordMail,
    resetPassword,
};

//  logInUser,
//     logoutUser,
//     verifyUserMail,
//     getAccessToken,
//     forgotPasswordMail,
//     resetPassword,
