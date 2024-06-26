import bcript from "bcryptjs";

export const handleHashPassword =  async (password) => {
    const passwordHash = await bcript.hash(password, 10);
    return passwordHash;
}

export const handleVerifyPasswordHash = async (password, passwordHash) => {
    const isMatch = await bcript.compare(password, passwordHash);
    return isMatch;
}
