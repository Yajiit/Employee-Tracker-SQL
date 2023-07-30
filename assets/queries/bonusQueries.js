// bonusQueries.js
const inquirer = require('inquirer');
const pool = require('../config/connections');
const consoleTable = require('console.table');

// Function to update employee manager
function updateEmployeeManager(startApp) {
    const queryEmployees = 'SELECT id, first_name, last_name FROM employee';
    pool.query(queryEmployees, (err, employees) => {
      if (err) {
        console.error('Error:', err);
        return;
      }
  
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'employeeId',
            message: 'Select the employee to update:',
            choices: employees.map((employee) => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id
            }))
          },
          {
            type: 'list',
            name: 'managerId',
            message: 'Select the employee\'s new manager:',
            choices: [
              { name: 'None', value: null },
              ...employees.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
              }))
            ]
          }
        ])
        .then((answers) => {
          const query = 'UPDATE employee SET manager_id = ? WHERE id = ?';
          pool.query(query, [answers.managerId, answers.employeeId], (err, res) => {
            if (err) {
              console.error('Error:', err);
            } else {
              console.log('Employee manager updated successfully!');
              startApp();
            }
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  }
  
  // Function to view employees by manager
  function viewEmployeesByManager(startApp) {
    const queryManagers = 'SELECT id, first_name, last_name FROM employee WHERE EXISTS (SELECT 1 FROM employee AS e WHERE e.manager_id = employee.id)';
    pool.query(queryManagers, (err, managers) => {
      if (err) {
        console.error('Error:', err);
        return;
      }
  
      inquirer
        .prompt({
          type: 'list',
          name: 'managerId',
          message: 'Select a manager to view employees:',
          choices: managers.map((manager) => ({
            name: `${manager.first_name} ${manager.last_name}`,
            value: manager.id
          }))
        })
        .then((answer) => {
          const queryEmployees = `
            SELECT emp.id AS Employee_ID, emp.first_name AS First_Name, emp.last_name AS Last_Name, 
              role.title AS Job_Title, department.name AS Department, 
              role.salary AS Salary
            FROM employee AS emp
            LEFT JOIN role ON emp.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            WHERE emp.manager_id = ?
          `;
          pool.query(queryEmployees, [answer.managerId], (err, employees) => {
            if (err) {
              console.error('Error:', err);
            } else {
              console.table(employees);
              startApp();
            }
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  }
  
  
  // Function to view employees by department
  function viewEmployeesByDepartment(startApp) {
    const queryDepartments = 'SELECT id, name FROM department';
    pool.query(queryDepartments, (err, departments) => {
      if (err) {
        console.error('Error:', err);
        return;
      }
  
      inquirer
        .prompt({
          type: 'list',
          name: 'departmentId',
          message: 'Select a department to view employees:',
          choices: departments.map((department) => ({
            name: department.name,
            value: department.id
          }))
        })
        .then((answer) => {
          const queryEmployees = `
            SELECT emp.id AS Employee_ID, emp.first_name AS First_Name, emp.last_name AS Last_Name, 
              role.title AS Job_Title, department.name AS Department, 
              role.salary AS Salary
            FROM employee AS emp
            LEFT JOIN role ON emp.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            WHERE department.id = ?
          `;
          pool.query(queryEmployees, [answer.departmentId], (err, employees) => {
            if (err) {
              console.error('Error:', err);
            } else {
              console.table(employees);
              startApp();
            }
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  }

// calls other delete functions
function deleteData(startApp) {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'deleteOption',
          message: 'What would you like to delete?',
          choices: ['Department', 'Role', 'Employee']
        }
      ])
      .then((answer) => {
        switch (answer.deleteOption) {
          case 'Department':
            deleteDepartment(startApp);
            break;
          case 'Role':
            deleteRole(startApp);
            break;
          case 'Employee':
            deleteEmployee(startApp);
            break;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  // Function to delete department
  function deleteDepartment(startApp) {
    const queryDepartments = 'SELECT id, name FROM department';
    pool.query(queryDepartments, (err, departments) => {
      if (err) {
        console.error('Error:', err);
        return;
      }
  
      inquirer
        .prompt({
          type: 'list',
          name: 'departmentId',
          message: 'Select a department to delete:',
          choices: departments.map((department) => ({
            name: department.name,
            value: department.id
          }))
        })
        .then((answer) => {
          const query = 'DELETE FROM department WHERE id = ?';
          pool.query(query, [answer.departmentId], (err, res) => {
            if (err) {
              console.error('Error:', err);
            } else {
              console.log('Department deleted successfully!');
              startApp();
            }
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  }
  
  // Function to delete role
  function deleteRole(startApp) {
    const queryRoles = 'SELECT id, title FROM role';
    pool.query(queryRoles, (err, roles) => {
      if (err) {
        console.error('Error:', err);
        return;
      }
  
      inquirer
        .prompt({
          type: 'list',
          name: 'roleId',
          message: 'Select a role to delete:',
          choices: roles.map((role) => ({
            name: role.title,
            value: role.id
          }))
        })
        .then((answer) => {
          const query = 'DELETE FROM role WHERE id = ?';
          pool.query(query, [answer.roleId], (err, res) => {
            if (err) {
              console.error('Error:', err);
            } else {
              console.log('Role deleted successfully!');
              startApp();
            }
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  }
  
  // Function to delete employee
  function deleteEmployee(startApp) {
    const queryEmployees = 'SELECT id, first_name, last_name FROM employee';
    pool.query(queryEmployees, (err, employees) => {
      if (err) {
        console.error('Error:', err);
        return;
      }
  
      inquirer
        .prompt({
          type: 'list',
          name: 'employeeId',
          message: 'Select an employee to delete:',
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
          }))
        })
        .then((answer) => {
          const query = 'DELETE FROM employee WHERE id = ?';
          pool.query(query, [answer.employeeId], (err, res) => {
            if (err) {
              console.error('Error:', err);
            } else {
              console.log('Employee deleted successfully!');
              startApp();
            }
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  }
  
  // Function to view total combined salary of selected department
  function viewDepartmentSalary(startApp) {
    const queryDepartments = 'SELECT id, name FROM department';
    pool.query(queryDepartments, (err, departments) => {
      if (err) {
        console.error('Error:', err);
        return;
      }
  
      inquirer
        .prompt({
          type: 'list',
          name: 'departmentId',
          message: 'Select a department to view the total combined salary:',
          choices: departments.map((department) => ({
            name: department.name,
            value: department.id
          }))
        })
        .then((answer) => {
          const query = `
            SELECT department.name AS Department, SUM(role.salary) AS Total_Salary
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            WHERE department.id = ?
            GROUP BY department.name
          `;
          pool.query(query, [answer.departmentId], (err, results) => {
            if (err) {
              console.error('Error:', err);
            } else {
              console.table(results);
              startApp();
            }
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  }
  // export functionality
module.exports = {
    updateEmployeeManager,
    viewEmployeesByDepartment,
    viewEmployeesByManager,
    deleteData,
    viewDepartmentSalary
};