<<<<<<< HEAD
// middleware global qui intercepte toutes les erreurs passées via next(error)
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // email ou valeur déjà utilisée (contrainte unique en base)
    if (err.code === "P2002") {
        return res.status(409).json({ message: "A record with this value already exists" });
    }
    // enregistrement introuvable en base
    if (err.code === "P2025") {
        return res.status(404).json({ message: "Record not found" });
    }

    // utilise le statusCode défini dans l'erreur, sinon 500 par défaut
    res.status(err.statusCode || 500).json({ message: err.message || "Internal Server Error" });
};

export default errorHandler;
=======
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({message: err.message || "Internal Server Error"})
}; 

export default errorHandler
>>>>>>> master
