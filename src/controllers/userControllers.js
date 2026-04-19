import * as userService from "../services/userService.js";

// récupérer tous les utilisateurs avec pagination
const getAllUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const results = await userService.getAllUsers({ page, limit });
        res.json(results);
    } catch (error) {
        next(error);
    }
};

// récupérer un utilisateur par son id
const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

// créer un utilisateur (route admin)
const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await userService.createUser({ name, email, password });
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

// modifier le nom et/ou l'email d'un utilisateur
const updateUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const user = await userService.updateUser(req.params.id, { name, email });
        res.json(user);
    } catch (error) {
        next(error);
    }
};

// supprimer un utilisateur
const deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
