# MovieTreasures API

API REST pour gérer des utilisateurs et des films. Construite avec Node.js, Express, Prisma et PostgreSQL.

## Stack

- **Node.js** avec ES Modules
- **Express 5**
- **Prisma** (ORM) + **PostgreSQL**
- **JWT** pour l'authentification
- **bcrypt** pour le hashage des mots de passe

## Installation

```bash
npm install
```

Crée un fichier `.env` à la racine :

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/users-management"
JWT_SECRET="un_secret_bien_solide"
```

Lance la migration pour créer les tables :

```bash
npx prisma migrate dev
```

Génère le client Prisma :

```bash
npx prisma generate
```

Ajoute des données de démo (users + films) :

```bash
npm run seed
```

Lance le serveur :

```bash
npm run dev
```

L'API tourne sur `http://localhost:3000`.

---

## Routes

Toutes les routes sauf `/login` et `/register` nécessitent un header :
```
Authorization: Bearer <token>
```

### Auth

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/auth/register` | Créer un compte |
| POST | `/api/auth/login` | Se connecter |
| GET | `/api/auth/me` | Infos de l'utilisateur connecté |

### Films

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/movies` | Lister tous les films |
| GET | `/api/movies/:id` | Récupérer un film par son id |
| GET | `/api/movies/search?title=...&genre=...` | Rechercher des films |
| POST | `/api/movies` | Créer un film |
| PUT | `/api/movies/:id` | Modifier un film |
| DELETE | `/api/movies/:id` | Supprimer un film |

### Utilisateurs

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/users` | Lister tous les utilisateurs |
| GET | `/api/users/:id` | Récupérer un utilisateur par son id |
| POST | `/api/users` | Créer un utilisateur |
| PUT | `/api/users/:id` | Modifier un utilisateur |
| DELETE | `/api/users/:id` | Supprimer un utilisateur |

---

## Exemples de body

**POST /api/auth/register**
```json
{
  "name": "Elyas",
  "email": "elyas@test.com",
  "password": "password123"
}
```

**POST /api/movies**
```json
{
  "title": "Inception",
  "description": "Un film sur les rêves",
  "releaseYear": 2010,
  "genre": "Sci-Fi",
  "director": "Christopher Nolan",
  "rating": 8.8
}
```

**PUT /api/users/:id** (tous les champs sont optionnels)
```json
{
  "name": "Nouveau Nom",
  "email": "nouveau@email.com"
}
```

---

## Codes de réponse

| Code | Signification |
|------|---------------|
| 200 | Succès |
| 201 | Créé avec succès |
| 400 | Champs manquants dans le body |
| 401 | Non authentifié (token manquant ou invalide) |
| 404 | Ressource introuvable |
| 409 | Email ou titre déjà utilisé |
| 500 | Erreur serveur |
