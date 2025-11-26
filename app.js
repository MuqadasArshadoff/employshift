import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Middlewares & Routes
import { errorHandler } from "./src/core/middleware/errorHandler.js";
import userRouter from "./src/modules/user/user.route.js";
import jobApplierRoutes from "./src/modules/jobapplier/jobApplier.routes.js";
import companyOwnerRoutes from "./src/modules/companyOwner/companyOwner.routes.js"; // ⬅️ NEW

const app = express();

dotenv.config();

// =========================
//       MIDDLEWARES
// =========================
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// =========================
//       ROUTES
// =========================
app.use('/api/v1/users', userRouter);
app.use('/api/v1/job-applier', jobApplierRoutes);
app.use('/api/v1/company-owner', companyOwnerRoutes); // ⬅️ NEW ROUTE ADDED

// =========================
//    HEALTH CHECK ROUTE
// =========================
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: '🚀 Server is running smoothly - Module Structure',
        timestamp: new Date().toISOString()
    });
});

// =========================
//    ERROR HANDLER
// =========================
app.use(errorHandler);

export default app;
