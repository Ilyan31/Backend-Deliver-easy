import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env);
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // Conversion en nombre car les env sont en chaîne
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  insecureAuth:true
});

export default pool;