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
// export functionality
module.exports = {
    viewAllDepartments,
    viewAllEmployees,
    viewAllRoles,
    addDepartment,
};