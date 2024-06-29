import dotenv from "dotenv";
import app from "./app";
import { prisma } from "./database/prisma";

dotenv.config();

const PORT = process.env.PORT || 4040;
const HOST = "0.0.0.0";

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
  });
};

const connectWithRetry = async () => {
  try {
    await prisma.$connect();
    console.log("PostgreSQL connection was successful...");
    startServer();
  } catch (err: any) {
    console.error("Failed to connect to the database: ", err.message);
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();
