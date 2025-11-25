import multer from "multer";
import path from "path";
import fs from "fs";

// ======================================
// 📌 CREATE UPLOAD FOLDER IF NOT EXISTS
// ======================================
const resumeFolder = "uploads/resumes";

if (!fs.existsSync(resumeFolder)) {
    fs.mkdirSync(resumeFolder, { recursive: true });
}

// ======================================
// 📌 MULTER STORAGE CONFIG
// ======================================
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, resumeFolder);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const fileName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
        cb(null, fileName);
    },
});

// ======================================
// 📌 FILE FILTER (ONLY PDF ALLOWED)
// ======================================
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"), false);
    }
};

// ======================================
// 📌 MULTER INSTANCE
// ======================================
export const uploadResume = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});
