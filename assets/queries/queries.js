// queries.js
const inquirer = require('inquirer');
const pool = require('../config/connections');
const consoleTable = require('console.table');

// Function to view all departments
function viewAllDepartments(startApp) {
  const query = 'SELECT id AS Department_ID, name AS Department_Name FROM department';
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.table(results);
      startApp();
    }
  });
}

// Function to view all roles
function viewAllRoles(startApp) {
  const query = `
    SELECT role.id AS Role_ID, role.title AS Job_Title, role.salary AS Salary, department.name AS Department_Name
    FROM role
    INNER JOIN department ON role.department_id = department.id
  `;
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.table(results);
      startApp();
    }
  });
}

// Function to view all employees
function viewAllEmployees(startApp) {
  const query = `
    SELECT 
      employee.id AS Employee_ID,
      employee.first_name AS First_Name,
      employee.last_name AS Last_Name,
      role.title AS Job_Title,
      department.name AS Department,
      role.salary AS Salary,
      CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
  `;
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.table(results);
      startApp();
    }
  });
}

// Function to add a department
function addDepartment(startApp) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the new department:',
        validate: (input) => input.trim() !== '',
      },
    ])
    .then((answers) => {
      const query = 'INSERT INTO department (name) VALUES (?)';
      pool.query(query, [answers.departmentName], (err, results) => {
        if (err) {
          console.error('Error:', err);
        } else {
          console.log(`Department '${answers.departmentName}' added successfully!`);
          startApp();
        }
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Function to add a role
function addRole(startApp) {
  // Fetch all departments to allow the user to select the department for the new role
  const queryDepartments = 'SELECT id, name FROM department';
  pool.query(queryDepartments, (err, departments) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'roleTitle',
          message: 'Enter the title of the new role:',
          validate: (input) => input.trim() !== '',
        },
        {
          type: 'input',
          name: 'roleSalary',
          message: 'Enter the salary for the new role:',
          validate: (input) => !isNaN(input),
        },
        {
          type: 'list',
          name: 'departmentId',
          message: 'Select the department for the new role:',
          choices: departments.map((dept) => ({ name: dept.name, value: dept.id })),
        },
      ])
      .then((answers) => {
        const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        pool.query(query, [answers.roleTitle, parseFloat(answers.roleSalary), answers.departmentId], (err, res) => {
          if (err) throw err;
          console.log(`Role '${answers.roleTitle}' added successfully!`);
          startApp();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
}

// Function to add an employee
function addEmployee(startApp) {
  // Fetch all roles and employees to allow the user to select the role and manager for the new employee
  const queryRoles = 'SELECT id, title FROM role';
  const queryManagers = 'SELECT id, first_name, last_name FROM employee';
  pool.query(queryRoles, (errRoles, roles) => {
    if (errRoles) {
      console.error('Error:', errRoles);
      return;
    }
    
    pool.query(queryManagers, (errManagers, employees) => {
      if (errManagers) {
        console.error('Error:', errManagers);
        return;
      }

      inquirer
        .prompt([
          {
            type: 'input',
            name: 'firstName',
            message: "Enter the employee's first name:",
            validate: (input) => input.trim() !== '',
          },
          {
            type: 'input',
            name: 'lastName',
            message: "Enter the employee's last name:",
            validate: (input) => input.trim() !== '',
          },
          {
            type: 'list',
            name: 'roleId',
            message: "Select the employee's role:",
            choices: roles.map((role) => ({ name: role.title, value: role.id })),
          },
          {
            type: 'list',
            name: 'managerId',
            message: "Select the employee's manager (if applicable):",
            choices: [{ name: 'None', value: null }, ...employees.map((employee) => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))],
          },
        ])
        .then((answers) => {
          const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
          pool.query(query, [answers.firstName, answers.lastName, answers.roleId, answers.managerId], (err, res) => {
            if (err) {
              console.error('Error:', err);
            } else {
              console.log(`Employee '${answers.firstName} ${answers.lastName}' added successfully!`);
              startApp();
            }
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  });
}
// export functionality
module.exports = {
    viewAllDepartments,
    viewAllEmployees,
    viewAllRoles,
    addDepartment,
    addRole,
    addEmployee,
};