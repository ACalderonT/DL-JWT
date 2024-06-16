import "dotenv/config";
import format from "pg-format";
import { pool }  from "../database/connection.js";
import { handleHashPassword } from "../utils/utils.js";

const BASE_URL = 
    process.env.NODE_ENV === "production"
        ? process.env.DOMAIN_URL_APP
        : `http://localhost:${process.env.PORT}`;


const findUserByEmail = async({ email }) => {
    const query = "SELECT * FROM usuarios WHERE email = %L"
    const formattedQuery = format(query, email);    
    const { rows } = await pool.query(formattedQuery);

    const user = rows[0]
    const userResponse = {
        email: user?.email,
        rol: user?.rol,
        lenguage: user?.lenguage,
    }
    return userResponse;
};

const findPasswordUserByEmail = async({ email }) => {
    const query = "SELECT * FROM usuarios WHERE email = %L"
    const formattedQuery = format(query, email);
    const { rows } = await pool.query(formattedQuery);
    
    const user = rows[0]
    return user.password
};

const createUser = async ({ email, password, rol, lenguage }) => {
    try{
        const hashedPassword = await handleHashPassword(password)
        const query = "INSERT INTO usuarios (email, password, rol, lenguage) VALUES (%L, %L, %L, %L) RETURNING *";
        const formattedQuery = format(query, email, hashedPassword, rol, lenguage);
    
        const { rows } = await pool.query(formattedQuery);
        return rows[0];
    }catch(error){
        console.log(error)

        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json({ message });
        }

        return res.status(500).json({ message: "Internal Server Error" });
    }
    
};

export const softJobsModel = {
    findUserByEmail,
    findPasswordUserByEmail,
    createUser,

}