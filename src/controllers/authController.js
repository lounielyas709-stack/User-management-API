import * as authService from "../services/authService.js";

// connecter un utilisateur et retourner un token JWT
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "email and password are required" });
        const result = await authService.login({ email, password });
        res.json(result);
    } catch (error) {
        next(error);
    }
};

// inscrire un nouvel utilisateur et retourner un token JWT
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "name, email and password are required" });
        const result = await authService.register({ name, email, password });
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

// retourner les infos de l'utilisateur connecté (via son token)
const me = async (req, res, next) => {
    try {
        const user = await authService.me(req.userId);
        res.json({ user });
    } catch (error) {
        next(error);
    }
};

export { login, register, me };
