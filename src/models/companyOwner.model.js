// src/modules/companyOwner/companyOwner.model.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const companyOwnerSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyName: { type: String, required: true },
    contactNumber: { type: String },
    createdAt: { type: Date, default: Date.now }
});

// Password hash before save
companyOwnerSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Password compare
companyOwnerSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
 const CompanyOwner = mongoose.model("CompanyOwner", companyOwnerSchema);
export default CompanyOwner;