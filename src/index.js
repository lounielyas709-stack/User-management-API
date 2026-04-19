import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

// autorise le frontend à faire des requêtes vers l'API
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// permet de lire le JSON dans le body des requêtes
app.use(express.json());
// affiche les requêtes dans la console (méthode, route, status, temps)
app.use(morgan("dev"));

// route de test pour vérifier que l'API tourne
app.get('/', (req, res) => res.json({ message: 'MovieTreasures API' }));

// branche les routes sur leurs préfixes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);

// gère toutes les erreurs remontées par next(error)
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
