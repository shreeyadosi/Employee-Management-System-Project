const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// =========================
// MYSQL CONNECTION
// =========================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_management",
});

db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed:", err);
  } else {
    console.log("Database Connected");
  }
});


// =========================
// LOGIN
// =========================
app.post("/login", (req, res) => {

  const { username, password } = req.body;

  const sql = `
    SELECT * FROM users
    WHERE username = ? AND password = ?
  `;

  db.query(sql, [username, password], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    if (result.length > 0) {

      res.send({
        success: true,
        role: result[0].role,
        token: "dummy-token"
      });

    } else {

      res.status(401).send({
        success: false,
        message: "Invalid username or password"
      });
    }
  });
});


// =========================
// SIGNUP
// =========================
app.post("/signup", (req, res) => {

  const {
    username,
    password,
    role
  } = req.body;

  const sql = `
    INSERT INTO users
    (username, password, role)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [username, password, role],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.send({
        success: true,
        message: "Signup Successful"
      });
    }
  );
});


// =========================
// GET ALL EMPLOYEES
// =========================
app.get("/employees", (req, res) => {

  const sql = `
    SELECT * FROM employees
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});


// =========================
// ADD EMPLOYEE
// =========================
app.post("/employees", (req, res) => {

  const {
    name,
    position,
    salary,
    email,
    phone,
    hire_date
  } = req.body;

  const sql = `
    INSERT INTO employees
    (name, position, salary, email, phone, hire_date)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, position, salary, email, phone, hire_date],
    (err, result) => {

      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send("Employee Added Successfully");
      }
    }
  );
});


// =========================
// UPDATE EMPLOYEE
// =========================
app.put("/employees/:id", (req, res) => {

  const id = req.params.id;

  const {
    name,
    position,
    salary,
    email,
    phone,
    hire_date
  } = req.body;

  const sql = `
    UPDATE employees
    SET
      name = ?,
      position = ?,
      salary = ?,
      email = ?,
      phone = ?,
      hire_date = ?
    WHERE emp_id = ?
  `;

  db.query(
    sql,
    [name, position, salary, email, phone, hire_date, id],
    (err, result) => {

      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send("Employee Updated Successfully");
      }
    }
  );
});


// =========================
// DELETE EMPLOYEE
// =========================
app.delete("/employees/:id", (req, res) => {

  const id = req.params.id;

  const sql = `
    DELETE FROM employees
    WHERE emp_id = ?
  `;

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send("Employee Deleted Successfully");
    }
  });
});


// =========================
// INNER JOIN REPORT
// =========================
app.get("/reports/innerjoin", (req, res) => {

  const sql = `
    SELECT
      emp_id,
      name,
      position
    FROM employees
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});


// =========================
// LEFT JOIN REPORT
// =========================
app.get("/reports/leftjoin", (req, res) => {

  const sql = `
    SELECT
      name,
      position,
      salary
    FROM employees
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});


// =========================
// RIGHT JOIN REPORT
// =========================
app.get("/reports/rightjoin", (req, res) => {

  const sql = `
    SELECT
      name,
      email
    FROM employees
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});


// =========================
// FULL JOIN REPORT
// =========================
app.get("/reports/fulljoin", (req, res) => {

  const sql = `
    SELECT *
    FROM employees
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});


// =========================
// ROOT
// =========================
app.get("/", (req, res) => {
  res.send("Backend Working");
});


// =========================
// SERVER
// =========================
app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});