import prisma from "../models/prisma.js"
import { comparePasswords } from "../utils/password.js"
import { generateToken } from "../utils/token.js"

const login = async({email, password}) => {
    const user = await prisma.user.findUnique({
        where: {email}
    })

    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const isValid = await comparePasswords(password, user.password);
    if (!isValid) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const token = generateToken(user.id);
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
}


export {login}

