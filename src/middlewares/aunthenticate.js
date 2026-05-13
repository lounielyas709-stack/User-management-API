import { verifyToken } from "../utils/token.js";

<<<<<<< HEAD
// vérifie que la requête contient un token JWT valide avant d'accéder à la route
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        // vérifier que le header Authorization existe et commence par "Bearer "
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
=======
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
>>>>>>> master
            return res.status(401).json({
                message: "Authentication failed"
            });
        }

<<<<<<< HEAD
        // extraire le token après "Bearer "
        const token = authHeader.split(" ")[1];
        const decodedToken = verifyToken(token);

        // stocker l'id de l'utilisateur dans la requête pour les controllers
        req.userId = decodedToken.userId;
        next();
    } catch(error) {
        // token invalide ou expiré → 401
        return res.status(401).json({ message: "Authentication failed" });
=======
        const token = authHeader.split(" ")[1];
        const decodedToken = verifyToken(token);

        req.userId = decodedToken.userId;
        next();
    } catch(error) {
        next(error);
>>>>>>> master
    }
}

export default authenticate
