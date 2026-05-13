<<<<<<< HEAD
import * as userService from "../services/userService.js";

// récupérer tous les utilisateurs avec pagination
const getAllUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const results = await userService.getAllUsers({ page, limit });
=======
import * as userService from '../services/userService.js';

const getAllUsers = async (req, res, next) => {
    try {
        const results = await userService.getAllUsers();
>>>>>>> master
        res.json(results);
    } catch (error) {
        next(error);
    }
};

<<<<<<< HEAD
// récupérer un utilisateur par son id
const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
=======
const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
>>>>>>> master
        res.json(user);
    } catch (error) {
        next(error);
    }
};

<<<<<<< HEAD
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
=======
const createUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const user = await userService.createUser(userData);
>>>>>>> master
        res.json(user);
    } catch (error) {
        next(error);
    }
};

<<<<<<< HEAD
// supprimer un utilisateur
const deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id);
        res.json({ message: "User deleted successfully" });
=======
const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const userData = req.body;

        const user = await userService.updateUser(userId, userData);
        res.json(user);
>>>>>>> master
    } catch (error) {
        next(error);
    }
};

<<<<<<< HEAD
export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
=======
const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        await userService.deleteUser(userId);
        res.json({
            message: 'User deleted succefully!'
        });
    } catch (error) {
        next(error);
    }
};

export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
>>>>>>> master
