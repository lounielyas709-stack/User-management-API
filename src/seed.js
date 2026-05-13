import 'dotenv/config';
import { PrismaClient } from "./generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const DEMO_MOVIES = [
    { title: "Inception", description: "Un voleur s'infiltre dans les rêves pour dérober des secrets.", releaseYear: 2010, genre: "Sci-Fi", director: "Christopher Nolan", rating: 8.8 },
    { title: "The Dark Knight", description: "Batman affronte le Joker, un criminel sans pitié.", releaseYear: 2008, genre: "Action", director: "Christopher Nolan", rating: 9.0 },
    { title: "Interstellar", description: "Des astronautes voyagent à travers un trou de ver pour sauver l'humanité.", releaseYear: 2014, genre: "Sci-Fi", director: "Christopher Nolan", rating: 8.6 },
    { title: "The Godfather", description: "La saga d'une famille mafieuse italienne à New York.", releaseYear: 1972, genre: "Crime", director: "Francis Ford Coppola", rating: 9.2 },
    { title: "Pulp Fiction", description: "Plusieurs histoires criminelles s'entremêlent à Los Angeles.", releaseYear: 1994, genre: "Crime", director: "Quentin Tarantino", rating: 8.9 },
    { title: "The Matrix", description: "Un hacker découvre que la réalité est une simulation.", releaseYear: 1999, genre: "Sci-Fi", director: "Lana Wachowski", rating: 8.7 },
    { title: "Parasite", description: "Une famille pauvre s'infiltre progressivement chez une famille riche.", releaseYear: 2019, genre: "Thriller", director: "Bong Joon-ho", rating: 8.5 },
    { title: "Forrest Gump", description: "La vie extraordinaire d'un homme ordinaire traversant l'histoire américaine.", releaseYear: 1994, genre: "Drama", director: "Robert Zemeckis", rating: 8.8 },
    { title: "The Shawshank Redemption", description: "Un homme innocent survit à la dureté de la prison grâce à l'espoir.", releaseYear: 1994, genre: "Drama", director: "Frank Darabont", rating: 9.3 },
    { title: "Amélie", description: "Une jeune femme timide décide de changer la vie des gens autour d'elle.", releaseYear: 2001, genre: "Romance", director: "Jean-Pierre Jeunet", rating: 8.3 },
];

const DEMO_ACCOUNTS = [
    { name: "Alice Martin",  email: "alice@movietreasures.com",  password: "alice123" },
    { name: "Bob Dupont",    email: "bob@movietreasures.com",    password: "bob123" },
    { name: "Carol Schmidt", email: "carol@movietreasures.com",  password: "carol123" },
    { name: "Admin",         email: "admin@movietreasures.com",  password: "admin123" },
];

async function seed() {
    console.log("Seeding demo accounts...");
    for (const account of DEMO_ACCOUNTS) {
        const hashed = await bcrypt.hash(account.password, 10);
        await prisma.user.upsert({
            where: { email: account.email },
            update: { password: hashed },
            create: { name: account.name, email: account.email, password: hashed }
        });
        console.log(`  Upserted: ${account.email}`);
    }

    console.log("Seeding demo movies...");
    for (const movie of DEMO_MOVIES) {
        const existing = await prisma.movie.findFirst({ where: { title: movie.title } });
        if (!existing) {
            await prisma.movie.create({ data: movie });
            console.log(`  Created: ${movie.title}`);
        } else {
            console.log(`  Already exists: ${movie.title}`);
        }
    }

    console.log("Done.");
    await prisma.$disconnect();
}

seed().catch(e => { console.error(e); process.exit(1); });
