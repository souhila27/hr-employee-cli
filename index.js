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
  console.log("Connected to the hremployeecli database.")
);

db.query(`SELECT * FROM employees`, (err, rows) => {
  console.log(rows);
});

// GET a single candidate
db.query(`SELECT * FROM employees WHERE id = 1`, (err, row) => {
  if (err) {
    console.log(err);
  }
  console.log(row);
});

// Delete a candidate
db.query(`DELETE FROM employees WHERE id = ?`, 2, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Create a candidate
const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
              VALUES (?,?,?,?)`;
const params = ["Ronald", "Firbank", 2, 1];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});
