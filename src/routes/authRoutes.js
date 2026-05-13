import { Router } from "express";
<<<<<<< HEAD
import * as authController from "../controllers/authController.js";
import authenticate from "../middlewares/aunthenticate.js";

const router = Router();

// connexion d'un utilisateur existant
router.post("/login", authController.login);
// inscription d'un nouvel utilisateur
router.post("/register", authController.register);
// récupérer l'utilisateur actuellement connecté (token requis)
router.get("/me", authenticate, authController.me);

export default router;
=======
import * as authController from "../controllers/authController.js"

const router = Router()

router.post("/login", authController.login);

export default router; 
>>>>>>> master
