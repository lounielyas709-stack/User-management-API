import { verifyToken } from "../utils/token.js";

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }

        const token = authHeader.split(" ")[1];
        const decodedToken = verifyToken(token);

        req.userId = decodedToken.userId;
        next();
    } catch(error) {
        next(error);
    }
}

export default authenticate
