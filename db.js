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
            "View Current Departments",
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
            case "View Current Departments":
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

// Function that adds an employee
function addEmployee() {
    inquirer.prompt([
    {
        type: "input",
        name: "firstName",
        message: "Enter the employee's first name."
    },
    {
        type: "input",
        name: "lastName",
        message: "Enter the employee's last name."
    },
    {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: ["Manager", "Intern", "Engineer"]
    },
    {
        type: "input",
        name: "manager",
        message: "Who is this employee's manager?"
    }]).then(userInput => {
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: userInput.firstName,
            last_name: userInput.lastName,
            role_id: userInput.role,
            manager_id: userInput.manager
        },
        function(err, result){
            if (err) {
                throw err;
            } else {
                console.log("Employee added!")
                console.table(result);
                beginApp();
            }
        });
    });
}

// Function to view all employees
function viewEmployees() {
    connection.query("SELECT * FROM employee", (err, result) => {
        if (err) {
            throw err;
        } else {
            console.table(result);
        }
    });
}

// sales, engineering, legal, finance
// Function to view all employees by department
function viewByDepartment() {
    connection.query("SELECT * FROM department ")
}

// Function to add department. This will create a new department if needed by
// the employer. If there is no "sales" department, they may add it in.
function addEmDepartment() {
    inquirer.prompt({
        type: "input",
        name: "departmentName",
        message: "Please enter the department name you would like to add."
    }).then(userInput => {
        connection.query("INSERT INTO department SET ?", 
        {
            name: userInput.departmentName
        }, 
        function(err, result){
            if(err) {
                throw err;
            } else {
                console.log("Department added!");
                console.table(userInput);
                beginApp();
            }
        });
    });
}


// Function to view all departments
function viewByDepartment(){
    connection.query("SELECT name FROM department", function(err, result){
      if (err) {
        throw err 
        } else {
          console.table(result);
          beginApp();
        }
    });
}