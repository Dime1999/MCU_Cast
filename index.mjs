//Import necessary dependency to run queries to the database
import mysql from "mysql2/promise";

//Starting point of code
export const handler = async () => {
  let connection;
  //Connection to database
  try {
    connection = await mysql.createConnection({
      host: "host link for your database",
      user: "username for your database",
      password: "password for your database",
      database: "name of your database",
      port: "port of your database",
    });

    const [rows] = await connection.execute("SELECT * FROM actors");

    //Returns correct result if no errors are present
    return {
      statusCode: 200,
      //Needed database permissions to allow connections from different platforms
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // or your domain
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify({ data: rows })
    };    
  } catch (err) { //Returns an error message if connection or query failed
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
      headers: { "Content-Type": "application/json" },
    };
  } finally {
    if (connection) await connection.end();
  }
};
