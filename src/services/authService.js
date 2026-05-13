<<<<<<< HEAD
import prisma from "../models/prisma.js";
import { comparePasswords, hashPassword } from "../utils/password.js";
import { generateToken } from "../utils/token.js";

// vérifier les identifiants et retourner un token + les infos de l'utilisateur
const login = async ({ email, password }) => {
    // chercher l'utilisateur par email
    const user = await prisma.user.findUnique({ where: { email } });
=======
import prisma from "../models/prisma.js"
import { comparePasswords } from "../utils/password.js"
import { generateToken } from "../utils/token.js"

const login = async({email, password}) => {
    const user = await prisma.user.findUnique({
        where: {email}
    })

>>>>>>> master
    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }
<<<<<<< HEAD
    // comparer le mot de passe envoyé avec le hash en base
=======

>>>>>>> master
    const isValid = await comparePasswords(password, user.password);
    if (!isValid) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }
<<<<<<< HEAD
    const token = generateToken(user.id);
    return { token, user: { id: user.id, name: user.name, email: user.email } };
};

// créer un nouvel utilisateur et retourner un token
const register = async ({ name, email, password }) => {
    // vérifier que l'email n'est pas déjà utilisé
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        const error = new Error("Email already in use");
        error.statusCode = 409;
        throw error;
    }
    // hasher le mot de passe avant de le stocker
    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
        data: { name, email, password: hashed },
        // on exclut le mot de passe de la réponse
        select: { id: true, name: true, email: true, createdAt: true }
    });
    const token = generateToken(user.id);
    return { token, user };
};

// récupérer les infos de l'utilisateur connecté sans son mot de passe
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
=======

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

>>>>>>> master
