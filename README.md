# Product CRUD API

A beginner-friendly backend project using Node.js, Express, Mongoose, and MongoDB Atlas. It implements Create, Read, Update, and Delete (CRUD) operations for products, using separate model, controller, and route files.

## Requirements

- Node.js 20.19 or newer (Node.js 22 or 24 LTS is recommended)
- A MongoDB Atlas cluster and database user
- Postman Desktop to run the included collection

## Set up

1. Install the project dependencies:

   ```bash
   npm install
   ```

   Or, if you use pnpm, run `pnpm install`.

2. Copy `.env.example` to `.env`.

   ```bash
   cp .env.example .env
   ```

3. In MongoDB Atlas, create a database user and allow your current IP address in the project's network access list. Copy the application's connection string and replace the placeholder values in `.env`. Keep `.env` private; it is excluded from Git.

   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER_HOST/product_api?retryWrites=true&w=majority
   ```

   If your database password contains reserved URL characters, URL-encode those characters before placing it in the connection string.

4. Start the development server:

   ```bash
   npm run dev
   ```

   With pnpm, run `pnpm dev`.

   The API listens at `http://localhost:5000` after it connects to Atlas. Open `http://localhost:5000/api/health` to confirm the API and database are ready.

## API routes

| Action | Method | URL |
| --- | --- | --- |
| Create a product | `POST` | `/api/products` |
| Read all products | `GET` | `/api/products` |
| Read one product | `GET` | `/api/products/:id` |
| Update a product | `PATCH` | `/api/products/:id` |
| Delete a product | `DELETE` | `/api/products/:id` |

Example JSON for creating a product:

```json
{
  "name": "Java Basics Book",
  "description": "A beginner-friendly programming book.",
  "price": 19.99,
  "category": "Books",
  "inStock": true
}
```

`name`, `price`, and `category` are required. `inStock` defaults to `true`; `description` defaults to an empty string.

## Test with Postman Desktop

1. Start the API with `npm run dev` and wait for the MongoDB connection message.
2. In Postman, import `postman/Product-CRUD-API.postman_collection.json`.
3. Send **Health check** first; it should return status 200.
4. Run the remaining requests in order: Create, Read All, Read One, Update, Delete. The Create request saves its new ID for the later requests.

## Project structure

```text
app.js                         Express app, JSON middleware, health route, and error responses
server.js                      Loads environment variables, connects to MongoDB, starts the server
config/database.js             MongoDB Atlas connection
models/Product.js              Product document fields and validation rules
controllers/productController.js CRUD request handlers
routes/productRoutes.js        Maps HTTP methods and URLs to handlers
postman/Product-CRUD-API.postman_collection.json  Ready-to-import Postman requests
```

## Publish to a public GitHub repository

Create an empty public repository on GitHub, then run these commands from this project folder. Replace the URL with your repository URL.

```bash
git init
git add .
git status
git commit -m "Build product CRUD API"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Before pushing, check that `.env` and `node_modules` are not listed by `git status`. Do not put database passwords or connection strings in source files or commit them.
