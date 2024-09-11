import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pkg.Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
