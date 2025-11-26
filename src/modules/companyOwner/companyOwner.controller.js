import { asyncHandler } from "../../core/utils/async-handler.js";
import { ApiResponse } from "../../core/utils/api-response.js";
import {
  createCompanyOwner,
  findOwnerByEmail,
  comparePassword,
  getOwnerById
} from "./companyOwner.service.js";

import jwt from "jsonwebtoken";

// ==================== REGISTER OWNER ====================
export const registerOwner = asyncHandler(async (req, res) => {
  // ✅ Correct destructuring
  const { userName, email, password, companyName, contactNumber } = req.body;

  // Check if email already exists
  const existing = await findOwnerByEmail(email);
  if (existing) throw new Error("Email already registered");

  // Create new owner
  const owner = await createCompanyOwner({
    userName,
    email,
    password,
    companyName,
    contactNumber
  });

  res.status(201).json(new ApiResponse(201, owner, "Owner registered successfully"));
});

// ==================== LOGIN OWNER ====================
export const loginOwner = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const owner = await findOwnerByEmail(email);
  if (!owner) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(owner, password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: owner._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.status(200).json(new ApiResponse(200, { token }, "Login successful"));
});

// ==================== GET OWNER PROFILE ====================
export const getOwnerProfile = asyncHandler(async (req, res) => {
  const owner = req.user; // set by isLoggedIn middleware
  res.status(200).json(new ApiResponse(200, owner, "Owner profile fetched"));
});
