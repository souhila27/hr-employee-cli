INSERT INTO departments (name)
VALUES
  ('Electronics');


INSERT INTO roles (title, salary, department_id)
VALUES
  ('Manager', 50000, 1),
  ('Clerk', 35000, 1);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, NULL),
  ('Ted', 'Banana', 2, 1);
