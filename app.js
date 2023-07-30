// app.js
const inquirer = require('inquirer');
const pool = require('./assets/config/connections');
const consoleTable = require('console.table');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./assets/queries/queries');

// Function to prompt the user for actions
function startApp() {
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        // add more choices here
        'Exit'
      ]
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View All Departments':
          viewAllDepartments(startApp);
          break;
        case 'View All Roles':
          viewAllRoles(startApp);
          break;
        case 'View All Employees':
          viewAllEmployees(startApp);
          break;
        case 'Add a Department':
          addDepartment(startApp);
          break;
        case 'Add a Role':
          addRole(startApp);
          break;
        case 'Add an Employee':
          addEmployee(startApp);
          break;          
        case 'Update an Employee Role':
          updateEmployeeRole(startApp);
          break;
// template for more options

// case 'CHOICE HERE':
//          functionNameHere();
//          break;
        case 'Exit':
          pool.end();
          console.log('Goodbye!');
          break;
        default:
          console.log('Invalid choice. Please select again.');
          startApp();
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Start application
startApp();
