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

  db.query('SHOW COLUMNS FROM employees', (err, results) => {
    if (err) {
      console.error('QUERY_ERR', err.message);
      process.exit(1);
    }
    console.log(JSON.stringify(results, null, 2));
    process.exit(0);
  });
});
