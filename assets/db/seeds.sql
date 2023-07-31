-- seeds.sql

-- 'department' table
INSERT INTO department (id, name)
VALUES
  (1, 'Bridge'),
  (2, 'Engineering'),
  (3, 'Security'),
  (4, 'Medical'),
  (5, 'Science'),
  (6, 'Operations');

-- 'role' table
INSERT INTO role (id, title, department_id, salary)
VALUES
  -- Bridge Department
  (1, 'Captain', 1, 100000.00),
  (2, 'First Officer', 1, 80000.00),
  (3, 'Helm Officer', 1, 70000.00),
  (4, 'Operations Officer', 1, 70000.00),
  (5, 'Navigation Officer', 1, 70000.00),
  
  -- Engineering Department
  (6, 'Chief Engineer', 2, 90000.00),
  (7, 'Assistant Chief Engineer', 2, 80000.00),
  (8, 'Engineer', 2, 60000.00),
  
  -- Security Department
  (9, 'Chief Security Officer', 3, 85000.00),
  (10, 'Security Officer', 3, 65000.00),
  
  -- Medical Department
  (11, 'Chief Medical Officer', 4, 85000.00),
  (12, 'Counselor', 4, 75000.00),
  (13, 'Doctor', 4, 70000.00),
  
  -- Science Department
  (14, 'Chief Science Officer', 5, 80000.00),
  (15, 'Science Officer', 5, 65000.00),
  
  -- Operations Department
  (16, 'Chief Operations Officer', 6, 85000.00),
  (17, 'Transporter Chief', 6, 70000.00),
  (18, 'Communications Officer', 6, 65000.00);

-- 'employee' table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
  -- Bridge Department
  (101, 'Jean-Luc', 'Picard', 1, NULL), -- Captain
  (102, 'William', 'Riker', 2, 101),    -- First Officer
  (103, 'Data', 'Soong', 5, 101),       -- Navigation Officer
  
  -- Engineering Department
  (106, 'Geordi', 'La Forge', 6, 101),    -- Chief Engineer
  (107, 'Miles', 'O Brien', 7, 106),       -- Assistant Chief Engineer
  (128, 'Reginald', 'Barclay', 8, 106),  -- Engineer
  (108, 'Wesley', 'Crusher', 8, 106),      -- Engineer
  
  -- Security Department
  (109, 'Tasha', 'Yar', 9, 101),          -- Chief Security Officer
  (110, 'Worf', 'Martok', 10, 109),            -- Security Officer
  
  -- Medical Department
  (111, 'Beverly', 'Crusher', 11, 101),   -- Chief Medical Officer
  (112, 'Deanna', 'Troi', 12, 101),        -- Counselor
  (113, 'Katherine', 'Pulaski', 13, 111),  -- Doctor
  (121, 'Julian', 'Bashir', 13, 111),      -- Doctor
  
  -- Science Department
  (114, 'Jadzia', 'Dax', 14, 101),        -- Chief Science Officer
  (129, 'Ro', 'Laren', 15, 114),         -- Science Officer 
  
  -- Operations Department
  (116, 'Odo', NULL, 16, NULL),            -- Chief Operations Officer
  (118, 'Keiko', 'O Brien', 18, 101);      -- Communications Officer