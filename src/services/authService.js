import prisma from "../models/prisma.js";
import { comparePasswords, hashPassword } from "../utils/password.js";
import { generateToken } from "../utils/token.js";

const login = async ({ email, password }) => {
    const user = await prisma.user.findUnique({ where: { email } });
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
    return { token, user: { id: user.id, name: user.name, email: user.email } };
};

const register = async ({ name, email, password }) => {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        const error = new Error("Email already in use");
        error.statusCode = 409;
        throw error;
    }

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
        data: { name, email, password: hashed },
        select: { id: true, name: true, email: true, createdAt: true }
    });

    const token = generateToken(user.id);
    return { token, user };
};

const me = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, createdAt: true }
    });
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return user;
};

export { login, register, me };
