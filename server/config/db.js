import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
});

export const connectDB = async () => {
  try {
    await pool.connect();
    console.log("PostgreSQL connected sucessfully");
  } catch (err) {
    console.error("PostgreSQL connection error:", err);
    process.exit(1);
  }
};
