import jwt from "jsonwebtoken"

// générer un token JWT signé avec l'id de l'utilisateur, valable 7 jours
export const generateToken = (userId) => {
    return jwt.sign ({ userId }, process.env.JWT_SECRET, {
    expiresIn:"7d"
    });
}

// vérifier et décoder un token JWT (lève une erreur si invalide ou expiré)
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}
