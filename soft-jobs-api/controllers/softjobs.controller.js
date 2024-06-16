import { softJobsModel } from "../models/softjobs.model.js";
import { getDatabaseError } from "../lib/errors/database.error.js";

const register = async (req, res) => {
    const { email, password, rol, lenguage } = req.body
    try{
        const user = await softJobsModel.createUser({
            email,
            password,
            rol,
            lenguage
        })

        if (!user) {
            return res.code(400).json({ message:"Can't create user" })
        }

        return res.status(201).json({ message: "User created successfully" });
    }catch(error){
        console.log(error);

        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json({ message });
        }

        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const read = async (req, res) => {
    try{
        const email = req.user
        const user = await softJobsModel.findUserByEmail(email)

        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }
        
        return res.status(200).json( [user] )

    }catch(error){
        console.log(error);

        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json({ message });
        }

        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const token = req.token

    try{
        const user = await softJobsModel.findUserByEmail(email)
        if (!user){
            return res.status(400).json({ message: "User not found" });
        }
    
        return res.status(200).json({ 
            message: "User logged successfully",
            email,
            token
         });
    }catch(error){
        console.log(error);

        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json({ message });
        }

        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const undefinedRoute = (req, res) => {
    res.status(404).send("Esta ruta no existe");
};

export const softJobsController = {
    register,
    read,
    login,
    undefinedRoute
}