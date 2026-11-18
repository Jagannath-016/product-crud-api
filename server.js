require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/database");

const port = Number(process.env.PORT) || 5000;

async function startServer() {
  try {
    await connectDatabase();

    app.listen(port, () => {
      console.log(`API listening at http://localhost:${port}`);
      console.log(`Health check: http://localhost:${port}/api/health`);
    });
  } catch (error) {
    console.error(`Could not start the API: ${error.message}`);
    process.exitCode = 1;
  }
}

startServer();
