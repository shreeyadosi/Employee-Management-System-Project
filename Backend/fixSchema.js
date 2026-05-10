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
    `ALTER TABLE employees ADD COLUMN position VARCHAR(255) NOT NULL`,
  ];

  const runQuery = (index) => {
    if (index >= queries.length) {
      db.query('SHOW COLUMNS FROM employees', (err, results) => {
        if (err) {
          console.error('SHOW_COLUMNS_ERR', err.message);
          process.exit(1);
        }
        console.log('Updated table schema:');
        console.table(results);
        process.exit(0);
      });
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
