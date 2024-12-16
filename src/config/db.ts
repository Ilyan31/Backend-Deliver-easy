import mysql, { RowDataPacket, OkPacket, ResultSetHeader } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // Conversion en nombre car les variables d'environnement sont des chaînes
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || undefined,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Limite de connexions simultanées
  queueLimit: 0,
});

// Fonction helper pour exécuter des requêtes SQL
export async function query<T extends RowDataPacket[] | OkPacket | ResultSetHeader>(
  sqlString: string,
  params: any[] = []
): Promise<T> {
  try {
    const [rows] = await pool.execute<T>(sqlString, params);
    return rows;
  } catch (error) {
    console.error("Erreur lors de l'exécution de la requête SQL :", error);
    throw error;
  }
}

export default pool;