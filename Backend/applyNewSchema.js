const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Smileforme@20',
  database: 'employee_management',
});

db.connect((err) => {
  if (err) {
    console.error('CONNECT_ERR', err.message);
    process.exit(1);
  }

  const queries = [
    `DROP TABLE IF EXISTS employee_positions`,
    `DROP TABLE IF EXISTS employees`,
    `DROP TABLE IF EXISTS positions`,
    `DROP TABLE IF EXISTS departments`,
    `CREATE TABLE departments (
      dept_id INT AUTO_INCREMENT PRIMARY KEY,
      dept_name VARCHAR(100) UNIQUE NOT NULL
    )`,
    `CREATE TABLE positions (
      position_id INT AUTO_INCREMENT PRIMARY KEY,
      position_name VARCHAR(100) UNIQUE NOT NULL
    )`,
    `CREATE TABLE employees (
      emp_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      dept_id INT,
      FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )`,
    `CREATE TABLE employee_positions (
      emp_id INT,
      position_id INT,
      PRIMARY KEY (emp_id, position_id),
      FOREIGN KEY (emp_id) REFERENCES employees(emp_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
      FOREIGN KEY (position_id) REFERENCES positions(position_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    )`,
    `INSERT INTO departments (dept_name) VALUES
    ('HR'),
    ('IT'),
    ('Design')`,
    `INSERT INTO positions (position_name) VALUES
    ('Manager'),
    ('Developer'),
    ('Designer')`,
    `INSERT INTO employees (name, dept_id) VALUES
    ('Rahul Sharma', 1),
    ('Priya Verma', 2),
    ('Amit Patil', 3)`,
    `INSERT INTO employee_positions (emp_id, position_id) VALUES
    (1, 1),
    (2, 2),
    (3, 3)`,
  ];

  const runQuery = (index) => {
    if (index >= queries.length) {
      console.log('Schema updated successfully');
      process.exit(0);
    }

    db.query(queries[index], (err) => {
      if (err) {
        console.error('QUERY_ERR', queries[index], err.message);
        process.exit(1);
      }
      runQuery(index + 1);
    });
  };

  runQuery(0);
});