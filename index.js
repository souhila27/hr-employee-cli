require("dotenv").config(); // Import dotenv for obscuring variables
const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: process.env.MYSQL_HOST || "localhost",
    // Your MySQL username,
    user: process.env.MYSQL_USER || "root",
    // Your MySQL password
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB || "hremployeecli",
  },
  console.log("Connected to the election database.")
);

db.query(`SELECT * FROM candidates`, (err, rows) => {
  console.log(rows);
});

// GET a single candidate
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
  if (err) {
    console.log(err);
  }
  console.log(row);
});

// Delete a candidate
db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
              VALUES (?,?,?,?)`;
const params = [1, "Ronald", "Firbank", 1];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});
