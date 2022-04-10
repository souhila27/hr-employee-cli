INSERT INTO departments (name)
VALUES
  ('Electronics');



INSERT INTO roles (title, salary, department_id)
VALUES
  ('Manager', 80000, 1),
  ('Helpdesk', 50000, 1);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Baner', 1, NULL),
  ('luis', 'lanilles', 2, 1);
