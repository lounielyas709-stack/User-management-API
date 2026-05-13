import prisma from "../models/prisma.js";
import { hashPassword } from "../utils/password.js";

const USER_SELECT = { id: true, name: true, email: true, createdAt: true, updatedAt: true };

export const getAllUsers = async ({ page = 1, limit = 10 } = {}) => {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
        prisma.user.findMany({ select: USER_SELECT, skip, take: limit, orderBy: { createdAt: "desc" } }),
        prisma.user.count()
    ]);
    return { data: users, total, page, limit, totalPages: Math.ceil(total / limit) };
};

export const getUserById = async (id) => {
    const user = await prisma.user.findUnique({ where: { id }, select: USER_SELECT });
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return { data: user };
};

export const createUser = async (userData) => {
    const existing = await prisma.user.findUnique({ where: { email: userData.email } });
    if (existing) {
        const error = new Error("Email already in use");
        error.statusCode = 409;
        throw error;
    }
    const hashed = await hashPassword(userData.password);
    const user = await prisma.user.create({
        data: { email: userData.email, name: userData.name, password: hashed },
        select: USER_SELECT
    });
    return { data: user };
};

export const updateUser = async (id, userData) => {
    const user = await prisma.user.update({
        where: { id },
        data: {
            ...(userData.email && { email: userData.email }),
            ...(userData.name && { name: userData.name })
        },
        select: USER_SELECT
    });
    return { data: user };
};

export const deleteUser = async (id) => {
    await prisma.user.delete({ where: { id } });
    return true;
};
