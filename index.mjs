// db.js
const mysql = require("mysql2/promise");

// Create a connection pool (recommended for production apps)
const pool = mysql.createPool({
  host: "mcucast2.cf0y22k2c49f.us-east-2.rds.amazonaws.com",      // e.g. mydb.xxxxxxx.us-east-1.rds.amazonaws.com
  user: "admin",      // your DB username
  password: "SparkingZero26&",  // your DB password
  database: "mcucast2",  // your DB name
  port: 3306,                     // default MySQL port
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
//import pool, { testConnection } from "./db.js";

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