// db.js
const mysql = require("mysql2/promise");

// Create a connection pool (recommended for production apps)
const pool = mysql.createPool({
  host: "mydb.xxxxxxx.us-east-2.rds.amazonaws.com",      // e.g. mydb.xxxxxxx.us-east-1.rds.amazonaws.com
  user: "private",      // your DB username
  password: "private",  // your DB password
  database: "private",  // your DB name
  port: "private",                     // default MySQL port
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Connected to Aurora/RDS!");
    connection.release();
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  }
}

export default pool;

// index.js
import pool, { testConnection } from "./db.js";

async function main() {
  await testConnection();

  try {
    const [rows] = await pool.query("SELECT NOW() AS currentTime");
    console.log("DB Time:", rows[0].currentTime);
  } catch (err) {
    console.error("Query error:", err.message);
  }
}

main();

