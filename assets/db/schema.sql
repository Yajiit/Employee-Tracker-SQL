-- department table
create table department (
  id INT auto_increment PRIMARY KEY,
  name VARCHAR(30)
);

-- role table
create table role (
  id INT auto_increment PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL(10, 2),
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

-- employee table
create table employee (
  id INT auto_increment PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);
