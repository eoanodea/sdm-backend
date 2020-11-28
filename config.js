import dotenv from "dotenv";
dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || "",
  client_origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
};

export default config;
