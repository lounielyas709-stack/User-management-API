import * as movieService from "../services/movieService.js";

// récupérer tous les films avec pagination (page et limit dans l'URL)
export const getAllMovies = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const movies = await movieService.getAllMovies({ page, limit });
        res.json(movies);
    } catch (error) {
        next(error);
    }
};

// récupérer un seul film par son id
export const getMovieById = async (req, res, next) => {
    try {
        const movie = await movieService.getMovieById(req.params.id);
        res.json(movie);
    } catch (error) {
        next(error);
    }
};

// rechercher des films par titre et/ou genre (?title=...&genre=...)
export const searchMovies = async (req, res, next) => {
    try {
        const { title, genre } = req.query;
        const movies = await movieService.searchMovies({ title, genre });
        res.json(movies);
    } catch (error) {
        next(error);
    }
};

// créer un nouveau film
export const createMovie = async (req, res, next) => {
    try {
        const { title, description, releaseYear, genre, director, rating } = req.body;
        if (!title || !releaseYear || !genre || !director)
            return res.status(400).json({ message: "title, releaseYear, genre and director are required" });
        const movie = await movieService.createMovie({ title, description, releaseYear: parseInt(releaseYear), genre, director, rating: rating ? parseFloat(rating) : 0 });
        res.status(201).json(movie);
    } catch (error) {
        next(error);
    }
};

// modifier un film existant (seuls les champs envoyés sont mis à jour)
export const updateMovie = async (req, res, next) => {
    try {
        const data = {};
        const fields = ["title", "description", "releaseYear", "genre", "director", "rating"];
        // on ne prend que les champs présents dans le body
        for (const f of fields) if (req.body[f] !== undefined) data[f] = req.body[f];
        if (data.releaseYear) data.releaseYear = parseInt(data.releaseYear);
        if (data.rating) data.rating = parseFloat(data.rating);
        const movie = await movieService.updateMovie(req.params.id, data);
        res.json(movie);
    } catch (error) {
        next(error);
    }
};

// supprimer un film
export const deleteMovie = async (req, res, next) => {
    try {
        await movieService.deleteMovie(req.params.id);
        res.json({ message: "Movie deleted successfully" });
    } catch (error) {
        next(error);
    }
};
