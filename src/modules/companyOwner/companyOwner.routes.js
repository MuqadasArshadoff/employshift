// src/modules/companyOwner/companyOwner.routes.js
import { Router } from "express";
import { validate } from "../../core/middleware/validate.js";
import { companyOwnerSchema } from "../../shared/validators/companyOwner.validator.js";
import { isLoggedIn } from "../../core/middleware/isLoggedin.js";
import { registerOwner, loginOwner, getOwnerProfile } from "./companyOwner.controller.js";


const router = Router();

router.post("/register", validate(companyOwnerSchema), registerOwner);
router.post("/login", loginOwner);
router.get("/me", isLoggedIn, getOwnerProfile); // ✅ correct

export default router;
