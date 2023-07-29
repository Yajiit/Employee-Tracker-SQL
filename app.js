// app.js
const inquirer = require('inquirer');
const pool = require('./db');
const consoleTable = require('console.table');

// Function to view all departments
function viewAllDepartments() {
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


// Function to prompt the user for actions
function startApp() {
    inquirer
      .prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View All Departments',
          // add more choices here
          'Exit'
        ]
      })
      .then((answer) => {
        switch (answer.action) {
          case 'View All Departments':
            viewAllDepartments();
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
