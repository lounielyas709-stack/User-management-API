import prisma from "../models/prisma.js";
import { hashPassword } from "../utils/password.js";

<<<<<<< HEAD
// champs à retourner pour un utilisateur (le mot de passe est exclu)
const USER_SELECT = { id: true, name: true, email: true, createdAt: true, updatedAt: true };

// récupérer tous les utilisateurs avec pagination
export const getAllUsers = async ({ page = 1, limit = 10 } = {}) => {
    const skip = (page - 1) * limit;
    // lancer les deux requêtes en parallèle pour aller plus vite
    const [users, total] = await Promise.all([
        prisma.user.findMany({ select: USER_SELECT, skip, take: limit, orderBy: { createdAt: "desc" } }),
        prisma.user.count()
    ]);
    return { data: users, total, page, limit, totalPages: Math.ceil(total / limit) };
};

// récupérer un utilisateur par son id
export const getUserById = async (id) => {
    const user = await prisma.user.findUnique({ where: { id }, select: USER_SELECT });
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return { data: user };
};

// créer un utilisateur en hashant son mot de passe
export const createUser = async (userData) => {
    // vérifier que l'email n'est pas déjà utilisé
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

// modifier le nom et/ou l'email d'un utilisateur (on ignore les champs vides)
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

// supprimer un utilisateur
export const deleteUser = async (id) => {
    await prisma.user.delete({ where: { id } });
    return true;
};
=======
export const getAllUsers = async () => {

    const userList = await prisma.user.findMany();
    const userCount = await prisma.user.count()
    return{
        data: userList,
        total: userCount
    };
};

export const getUserById = async (id) => {
    const userById= await prisma.user.findUnique(
        {where: {id}}
    );
    return{
        data: userById
    };
};

export const createUser= async (userData) => {
    const hashedPassword = await hashPassword(userData.password);
    const createdUser = await prisma.user.create({
        data: {
            email: userData.email,
            name: userData.name,
            password: hashedPassword
        }
    });
    return {
        data: createdUser
    };
};

export const updateUser = async (id, userData) => {
    const updatedUser = await prisma.user.update({
        where: {id},
        data: {
            ...(userData.email && {email: userData.email}),
            ...(userData.name && {name: userData.name})
        }
    });
    return {
        data: updatedUser
    };
};

export const deleteUser = async (id) => {
    const userById= await prisma.user.findUnique(
        {where: {id}}
    )
    return prisma.user.delete({where: {id}})
    return true;
}; 



>>>>>>> master
