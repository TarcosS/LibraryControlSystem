import { configDotenv } from "dotenv";
configDotenv();

export const PORT = process.env.PORT || 8001;
export const DB_URI = process.env.DB_URI || '';
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';