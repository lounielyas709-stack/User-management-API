import prisma from "../models/prisma.js";

// récupérer tous les films avec pagination
export const getAllMovies = async ({ page = 1, limit = 10 } = {}) => {
    // calculer combien de films sauter selon la page demandée
    const skip = (page - 1) * limit;
    // lancer les deux requêtes en parallèle pour aller plus vite
    const [movies, total] = await Promise.all([
        prisma.movie.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
        prisma.movie.count()
    ]);
    return { data: movies, total, page, limit, totalPages: Math.ceil(total / limit) };
};

// récupérer un film par son id
export const getMovieById = async (id) => {
    const movie = await prisma.movie.findUnique({ where: { id } });
    if (!movie) {
        const error = new Error("Movie not found");
        error.statusCode = 404;
        throw error;
    }
    return { data: movie };
};

// rechercher des films par titre et/ou genre (insensible à la casse)
export const searchMovies = async ({ title, genre }) => {
    const movies = await prisma.movie.findMany({
        where: {
            // on n'applique le filtre que si le paramètre est fourni
            ...(title && { title: { contains: title, mode: "insensitive" } }),
            ...(genre && { genre: { contains: genre, mode: "insensitive" } })
        },
        orderBy: { title: "asc" }
    });
    return { data: movies, total: movies.length };
};

// créer un nouveau film
export const createMovie = async (data) => {
    const movie = await prisma.movie.create({ data });
    return { data: movie };
};

// modifier un film existant
export const updateMovie = async (id, data) => {
    const movie = await prisma.movie.update({ where: { id }, data });
    return { data: movie };
};

// supprimer un film
export const deleteMovie = async (id) => {
    await prisma.movie.delete({ where: { id } });
    return true;
};
