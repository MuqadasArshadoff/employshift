// src/modules/companyOwner/companyOwner.service.js
import CompanyOwner  from "../../models/companyOwner.model.js"; // ✅ correct import
import bcrypt from "bcryptjs";

export const createCompanyOwner = async (data) => {
    const owner = await CompanyOwner.create(data);
    return owner;
};

export const findOwnerByEmail = async (email) => {
    return await CompanyOwner.findOne({ email });
};

export const getOwnerById = async (id) => {
    return await CompanyOwner.findById(id);
};

export const comparePassword = async (owner, password) => {
    return bcrypt.compare(password, owner.password);
};
