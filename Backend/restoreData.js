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
    `DELETE FROM employee_positions WHERE emp_id IN (1,2,3,5)`,
    `DELETE FROM employees WHERE emp_id IN (1,2,3,5)`,
    `ALTER TABLE employees AUTO_INCREMENT = 1`,
    `INSERT INTO employees (emp_id, name, dept_id) VALUES
    (1, 'Rahul Sharma', 1),
    (2, 'Priya Verma', 2),
    (3, 'Amit Patil', 3)`,
    `INSERT INTO employee_positions (emp_id, position_id) VALUES
    (1, 1),
    (2, 2),
    (3, 3)`,
  ];

  const runQuery = (index) => {
    if (index >= queries.length) {
      console.log('Sample data restored');
      db.end();
      return;
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