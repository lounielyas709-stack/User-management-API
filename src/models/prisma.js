import "dotenv/config"
import { PrismaClient } from "../generated/prisma/index.js";
import {PrismaPg} from "@prisma/adapter-pg";

<<<<<<< HEAD
// connecter Prisma à PostgreSQL via l'URL de la base de données
=======

>>>>>>> master
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

<<<<<<< HEAD
// instance unique de Prisma partagée dans toute l'application
const prisma = new PrismaClient({adapter})

export default prisma
=======
const prisma = new PrismaClient({adapter})

export default prisma

>>>>>>> master
