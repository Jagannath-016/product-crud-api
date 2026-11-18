const mongoose = require("mongoose");

async function connectDatabase() {
  const connectionString = process.env.MONGODB_URI;

  if (!connectionString || connectionString.includes("YOUR_")) {
    throw new Error(
      "Set your real Atlas connection string in the local .env file before starting the server."
    );
  }

  await mongoose.connect(connectionString);
  console.log("Connected to MongoDB Atlas.");
}

module.exports = connectDatabase;
