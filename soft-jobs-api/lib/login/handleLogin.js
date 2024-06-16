import jwt from "jsonwebtoken"
import { softJobsModel } from "../../models/softjobs.model.js"
import { handleVerifyPasswordHash } from "../../utils/utils.js"
import "dotenv/config";

export const HandleLoginMiddleware = async (req, res, next) => {
    try{
        const { email, password } = req.body
        const passwordHash = await softJobsModel.findPasswordUserByEmail({ email })
        const isMatch = await handleVerifyPasswordHash(password, passwordHash)

        if (!isMatch){
            return res.status(403).json({ message: "Invalid credentials", origin: 'Authorization' });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        req.token = token
        next()
    }catch(error){
        console.log(error);

        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json({ message });
        }

        return res.status(500).json({ message: "Internal Server Error" })
    }
}