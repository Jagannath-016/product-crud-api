const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Parse JSON request bodies so controllers can read req.body.
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Product CRUD API is running.",
    endpoints: "/api/products",
  });
});

app.get("/api/health", (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;

  res.status(databaseConnected ? 200 : 503).json({
    status: databaseConnected ? "ok" : "database-disconnected",
    database: databaseConnected ? "connected" : "disconnected",
  });
});

app.use("/api/products", productRoutes);

// Return a clear JSON response for unknown URLs.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Central error handler. Controllers pass errors here with next(error).
app.use((error, req, res, next) => {
  const isValidationError = error.name === "ValidationError";
  const isCastError = error.name === "CastError";
  const statusCode = isValidationError || isCastError
    ? 400
    : error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? "Internal server error." : error.message,
  });
});

module.exports = app;
