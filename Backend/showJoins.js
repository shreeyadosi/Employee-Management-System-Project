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
    {
      name: 'INNER JOIN (employees and departments)',
      sql: `SELECT e.name, d.dept_name
            FROM employees e
            INNER JOIN departments d ON e.dept_id = d.dept_id`
    },
    {
      name: 'LEFT JOIN (employees and departments)',
      sql: `SELECT e.name, d.dept_name
            FROM employees e
            LEFT JOIN departments d ON e.dept_id = d.dept_id`
    },
    {
      name: 'RIGHT JOIN (employees and departments)',
      sql: `SELECT e.name, d.dept_name
            FROM employees e
            RIGHT JOIN departments d ON e.dept_id = d.dept_id`
    },
    {
      name: 'Full JOIN with positions',
      sql: `SELECT e.name, d.dept_name, p.position_name
            FROM employees e
            LEFT JOIN departments d ON e.dept_id = d.dept_id
            LEFT JOIN employee_positions ep ON e.emp_id = ep.emp_id
            LEFT JOIN positions p ON ep.position_id = p.position_id`
    }
  ];

  const runQuery = (index) => {
    if (index >= queries.length) {
      db.end();
      return;
    }

    console.log(`\n--- ${queries[index].name} ---`);
    db.query(queries[index].sql, (err, results) => {
      if (err) {
        console.error('QUERY_ERR', err.message);
      } else {
        console.table(results);
      }
      runQuery(index + 1);
    });
  };

  runQuery(0);
});