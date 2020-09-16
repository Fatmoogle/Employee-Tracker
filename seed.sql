USE employee_db;

/* Adding departments into the table: department */
INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Legal");


/* Adding employees into the table: employee */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Alex", "Varela", 3, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Stiglitz", 4, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jen", "Koontz", 4, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Caleb", "Barnes", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("James", "Rolex", 2, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Drew", "Albacore", 7, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sandra", "Nanners", 6, 6);


/* Adding roles into the table: role */
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 60000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 50000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 75000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 65000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 65000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 60000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 70000, 4);
