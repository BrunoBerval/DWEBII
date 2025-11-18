//src/configs/db.ts
import dotenv from "dotenv";
dotenv.config();
import { Pool } from "pg";


export const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: String(process.env.PGPASSWORD),
  database: process.env.PGNAME,
  port: Number(process.env.PGPORT),
});

