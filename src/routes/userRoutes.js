import { Router } from "express";
import * as userController from "../controllers/userControllers.js";
import authenticate from "../middlewares/aunthenticate.js";

const router = Router();

router.get("/", authenticate, userController.getAllUsers);
router.get("/:id", authenticate, userController.getUserById);
router.post("/", authenticate, userController.createUser);
router.put("/:id", authenticate, userController.updateUser);
router.delete("/:id", authenticate, userController.deleteUser);

export default router;
