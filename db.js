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
                viewDepartments();
                break;
            case "View Employee Roles":
                viewRoles();
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
            case "Quit":
                console.log("Goodbye!")
                connection.end();
        }
    });
}

// Function to VIEW all employees
function viewEmployees() {
    connection.query("SELECT first_name, last_name, title, salary, manager_id FROM employee JOIN role ON employee.role_id = role.id", (err, result) => {
        if (err) {
            throw err;
        } else {
            console.table(result);
            beginApp();
        }
    });
}

// Function to VIEW all departments
function viewDepartments(){
    connection.query("SELECT name FROM department", function(err, result){
      if (err) {
        throw err 
        } else {
          console.table(result);
          beginApp();
        }
    });
}

// Function to VIEW all employee roles
function viewRoles() {
    connection.query("SELECT title, salary, department_id FROM role;", (err, result) => {
        if (err) {
            throw err;
        } else {
            console.table(result);
            beginApp();
        }
    });
}

// Function that ADDS an employee
function addEmployee() {
    connection.query("SELECT title FROM role", (err, result) => {
        let roles = [];
        for(var i = 0; i < result.length; i++) {
            roles.push(result[i].title);
        }
        // console.log(roles);
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
                choices: roles
                // roles as the choices should give the current up to date list of
                // current roles in the database
            }
            // The bonus is to get managers functioning, but it is currently a 
            // work in progress.
            // {
            //     type: "list",
            //     name: "manager",
            //     message: "Who is this employee's manager?",
            //     choices:
            //     [
            //         "Alex Varela",
            //         "Caleb Barnes",
            //         "Drew Albacore"
            //     ]
            // }
        ]).then(userInput => {
            // console.log(roles.indexOf("Salesperson"));
            const index = roles.indexOf(userInput.role) + 1;
            connection.query("INSERT INTO employee SET ?",
            {
                first_name: userInput.firstName,
                last_name: userInput.lastName,
                role_id: index,
                // manager_id: userInput.manager
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
    });

}


// Function to ADD employee role
function addEmRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "Title",
            message: "Please enter the title of the position."
        },
        {
            name: "Salary",
            type: "input",
            message: "Please enter the salary for this role."
        },
        {
            name: "DepartmentID",
            type: "input",
            message: "What is the department id for this role? Please enter a number. \n1. Sales \n2. Finance \n3. Engineering \n4. Legal \n"
        }
      ]).then((userInput) => {
      connection.query("INSERT INTO role SET ?", 
        { 
        title: userInput.Title, 
        salary: userInput.Salary, 
        department_id: userInput.DepartmentID
        }, 
        function(err, result) {
        if (err) {
            throw err;
        } else {
            console.log("New role added!");
            console.table(userInput); 
            beginApp();
        }
      });
    });
}

// Function to ADD department. This will create a new department if needed by
// the employer. If there is no "sales" department, they may add it in.
function addEmDepartment() {
    inquirer.prompt({
        type: "input",
        name: "Department",
        message: "Please enter the department name you would like to add."
    }).then(userInput => {
        connection.query("INSERT INTO department SET ?", 
        {
            name: userInput.Department
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


// Function to UPDATE employee role
function updateEmRole() {
connection.query("SELECT id, first_name, last_name FROM employee", (err, result) => {
    connection.query("SELECT * FROM employee_db.role;", (err1, result1) => {
    let empArr = [];
    let roleArr = [];
    for(var i = 0; i < result.length; i++) {
        empArr.push({ value: parseInt(result[i].id), name: result[i].first_name + " " + result[i].last_name });
        // empArr.push(result[i].first_name + " " + result[i].last_name);
    }
    for(var i = 0; i < result1.length; i++) {
        roleArr.push({ value: parseInt(result1[i].id), name: result1[i].title });
        // roleArr.push(result1[i].title);
    }

    inquirer.prompt([
        {
            type: "list",
            name: "emp",
            message: "Which employee would you like to update?",
            choices: empArr
        },
        {
            type: "list",
            name: "role",
            message: "Please specify the role you would like this employee to have.",
            choices: roleArr
        }
    ]).then(userInput => {
        connection.query("UPDATE employee SET ? WHERE ?",
        [{
            role_id: userInput.role
        },
        {
            id: userInput.emp
        }], beginApp)
    })})
}
)};








