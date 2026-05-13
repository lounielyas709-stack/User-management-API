<<<<<<< HEAD
import { Router } from "express";
import * as userController from "../controllers/userControllers.js";
=======
import {Router} from "express";
import * as userController from '../controllers/userControllers.js'
>>>>>>> master
import authenticate from "../middlewares/aunthenticate.js";

const router = Router();

<<<<<<< HEAD
// récupérer tous les utilisateurs (avec pagination)
router.get("/", authenticate, userController.getAllUsers);
// récupérer un utilisateur par son id
router.get("/:id", authenticate, userController.getUserById);
// créer un utilisateur (route admin, token requis)
router.post("/", authenticate, userController.createUser);
// modifier un utilisateur
router.put("/:id", authenticate, userController.updateUser);
// supprimer un utilisateur
router.delete("/:id", authenticate, userController.deleteUser);

export default router;
=======
router.get("/users", authenticate, userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

export default router;
>>>>>>> master
