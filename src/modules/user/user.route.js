import { Router } from "express";
import { forgotPasswordMail, getAccessToken, logInUser, logoutUser, registerUser, resetPassword, verifyUserMail } from "./user.controller.js";
import { validate } from "../../core/middleware/validate.js";
import { loginSchema, registerSchema } from "../../shared/validators/user.validator.js";
import { isLoggedIn } from "../../core/middleware/isLoggedin.js";

const userRouter = Router();

userRouter.post("/register", validate(registerSchema), registerUser)

userRouter.get('/verify/:token', verifyUserMail);

userRouter.post("/login", validate(loginSchema), logInUser);

userRouter.post("/logout", isLoggedIn, logoutUser);

userRouter.get('/access-token', isLoggedIn, getAccessToken);

userRouter.post('/forgot-password', isLoggedIn, forgotPasswordMail);

userRouter.post('/reset-password/:token', resetPassword);
export default userRouter;