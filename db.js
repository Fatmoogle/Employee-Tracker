// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// Setting up conection to MySQL
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Saur0n!1",
    database: "employee_db"
});

// Function to initialize the connection
connection.connect(err => {
    if (err) {
        throw err;
    } else {
        console.log(`You are connected as ${connection.threadId}`);
        beginApp();
    }
});

// Function that begins the application
function beginApp() {
    inquirer.prompt([
        {
        type: "list",
        name: "begin",
        message: "Hello and welcome to the Employee Tracker! What would you like to do?",
        choices: 
        [
            "View All Employees",
            "View All Employees by Department",
            "View Employee Roles",
            "Add Employee",
            "Add Employee Role",
            "Add Employee Department",
            "Update Employee Role",
            "Remove Employee",
            "Quit"
        ]
        }
    ]).then(answers => {
        switch (answers.begin) {
            case "View All Employees":
                viewEmployees();
                break;
            case "View All Employees by Department":
                viewByDepartment();
                break;
            case "View Employee Roles":
                viewByRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Add Employee Role":
                addEmRole();
                break;
            case "Add Employee Department":
                addEmDepartment();
                break;
            case "Update Employee Role":
                updateEmRole();
                break;
            case "Remove Employee":
                removeEmployee();
                break;
            case "Quit":
                console.log("Goodbye!")
                connection.end();
        }
    });
  }