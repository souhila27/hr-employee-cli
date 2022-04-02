require("dotenv").config(); // Import dotenv for obscuring variables
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root", // Your MySQL username,
    password: process.env.MYSQL_PASS, // Your MySQL password
    database: process.env.MYSQL_DB || "hremployeecli",
  },
  console.log("Connected to the hremployeecli database.")
);

// view all departments, roles, employees
const promptView = (table) => {
  db.query(`SELECT * FROM ${table}`, (err, rows) => {
    if (err) {
      console.log(`error: ${err.message}`);
      return;
    }

    console.table(rows);
  });
};

// add a department, role, employee
const promptAdd = (data) => {
  console.log(data);
  // const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
  //               VALUES (?,?,?,?)`;
  // const params = ["Ronald", "Firbank", 2, 1];

  // db.query(sql, params, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(result);
  // });
};

// Update an employee role
const promptUpdateRole = (data) => {
  console.log(data);
};

// Delete departments, roles, employees
const promptDelete = (id, table) => {
  console.log(id, table);
  // db.query(`DELETE FROM employees WHERE id = ?`, 2, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(result);
  // });
};

// Start of the Prompt
const promptStart = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: "What would you like to do?",
        choices: [
          "View Departments",
          "View Roles",
          "View Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.option) {
        case "View Departments":
          promptView("departments");
          break;
        case "View Roles":
          promptView("roles");
          break;
        case "View Employees":
          promptView("employees");
          break;
        case "Add Department":
          promptAdd();
          break;
        case "Add Role":
          promptAdd();
          break;
        case "Add Employee":
          promptAdd();
          break;
        case "Update Employee Role":
          promptUpdateRole();
          break;
        default:
          console.log(`No option selected.`);
          break;
      }
    });
};

// Initiate prompt
promptStart();
