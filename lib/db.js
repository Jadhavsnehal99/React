// lib/db.js
import mysql from 'mysql2/promise';

let pool;

export function createConnection() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      waitForConnections: true,
      connectionLimit: 10, // Adjust based on your DB's max allowed
      queueLimit: 0,
    });
  }

  return pool;
}
