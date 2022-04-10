require("dotenv").config(); // Import dotenv for obscuring variables
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

// Connect to database
const db = mysql.createConnection({
  host:  "localhost",
  port: 3306,
  user:  "root", // Your MySQL username,
  password:'School2021$', // Your MySQL password
  database:'hremployeecli',
  
});

// view all departments, roles, employees
function viewAll(table) {
  db.query(`SELECT * FROM ${table}`, (err, rows) => {
    if (err) {
      console.log(`error: ${err.message}`);
      return;
    }

    console.table(rows)
  ;
  promptStart();
  });
}

function addDepartment(name) {
  const sql = `INSERT INTO departments (name) VALUES (?)`;
  const params = [name];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
    // console.log(result);
    promptStart();
  });
}

function addRole(title, salary, departmentId) {
  const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
  const params = [title, salary, departmentId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    promptStart();
  });
}

function addEmployee(firstName, lastName, roleId, managerId) {
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
  const params = [firstName, lastName, roleId, managerId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    promptStart();
  });
}

// add a department
function promptAddDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department?",
      },
    ])
    .then((answers) => {
      addDepartment(answers.department);
      
    });
}

// add a role
function promptAddRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the role?",
      },
      {
        type: "number",
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "number",
        name: "departmentId",
        message: "What is the ID of the role's department?",
      },
    ])
    .then((answers) => {
      addRole(answers.title, answers.salary, answers.departmentId);
    });
}

// add a employee
function promptAddEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "number",
        name: "roleId",
        message: "What is the ID of the employee's role?",
      },
      {
        type: "number",
        name: "managerId",
        message: "What is the ID of the employee's manager?",
      },
    ])
    .then((answers) => {
      addEmployee(
        answers.firstName,
        answers.lastName,
        answers.roleId,
        answers.managerId,
      );
    });
}

// Update an employee role
function promptUpdateRole() {
  db.query(`SELECT first_name, last_name FROM employees`, (err, rows) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "option",
          message: "Who's role do you want to update?",
          choices: rows.map((row) => {
            return `${row.first_name} ${row.last_name}`;
          }),
        },
        {
          type: "number",
          name: "roleId",
          message: "What is the new role ID of the employee?",
        },
      ])
      .then((answers) => {
        const [firstName, lastName] = answers.option.split(" ");
        const sql = `UPDATE employees SET role_id = ${answers.roleId} 
        WHERE first_name = "${firstName}" AND last_name = "${lastName}"`;

        db.query(sql, (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log("Role updated", result);
        });
      });
  });
}

// Delete departments, roles, employees
// function promptDelete(id, table) {
//   console.log(id, table);
//   // db.query(`DELETE FROM employees WHERE id = ?`, 2, (err, result) => {
//   //   if (err) {
//   //     console.log(err);
//   //   }
//   //   console.log(result);
//   // });
// }

// Start of the Prompt
async function promptStart() {
  await inquirer
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
          viewAll("departments");
          break;
        case "View Roles":
          viewAll("roles");
          break;
        case "View Employees":
          viewAll("employees");
          break;
        case "Add Department":
          promptAddDepartment();
          break;
        case "Add Role":
          promptAddRole();
          break;
        case "Add Employee":
          promptAddEmployee();
          break;
        case "Update Employee Role":
          promptUpdateRole();
          break;
        default:
          console.log(`No option selected.`);
          break;
      }
    });
}

// Initiate prompt
promptStart()


