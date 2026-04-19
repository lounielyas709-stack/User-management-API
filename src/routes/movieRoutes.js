import { Router } from "express";
import * as movieController from "../controllers/movieController.js";
import authenticate from "../middlewares/aunthenticate.js";

const router = Router();

// /search doit être avant /:id pour ne pas être confondu avec un id
// rechercher des films par titre et/ou genre
router.get("/search", authenticate, movieController.searchMovies);
// récupérer tous les films (avec pagination)
router.get("/", authenticate, movieController.getAllMovies);
// récupérer un film par son id
router.get("/:id", authenticate, movieController.getMovieById);
// créer un nouveau film
router.post("/", authenticate, movieController.createMovie);
// modifier un film existant
router.put("/:id", authenticate, movieController.updateMovie);
// supprimer un film
router.delete("/:id", authenticate, movieController.deleteMovie);

export default router;
