import bcrypt from "bcrypt";

export const hashPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const passwordCompare = async (password, oldPassword) => {
    return await bcrypt.compare(password, oldPassword);
};