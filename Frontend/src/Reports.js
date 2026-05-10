import React, { useEffect, useState } from "react";
import axios from "axios";

function Reports() {

  const [innerJoin, setInnerJoin] = useState([]);
  const [leftJoin, setLeftJoin] = useState([]);
  const [rightJoin, setRightJoin] = useState([]);
  const [fullJoin, setFullJoin] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:5000/reports/innerjoin")
      .then(res => setInnerJoin(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:5000/reports/leftjoin")
      .then(res => setLeftJoin(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:5000/reports/rightjoin")
      .then(res => setRightJoin(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:5000/reports/fulljoin")
      .then(res => setFullJoin(res.data))
      .catch(err => console.error(err));

  }, []);

  return (

    <div>

      <h1 className="mb-4">SQL Join Reports</h1>

      {/* INNER JOIN */}
      <h2>INNER JOIN</h2>

      <table className="table table-bordered mb-5">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
          </tr>
        </thead>

        <tbody>
          {innerJoin.map((employee) => (
            <tr key={employee.emp_id}>
              <td>{employee.emp_id}</td>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
            </tr>
          ))}
        </tbody>

      </table>

      {/* LEFT JOIN */}
      <h2>LEFT JOIN</h2>

      <table className="table table-bordered mb-5">

        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
          </tr>
        </thead>

        <tbody>
          {leftJoin.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.salary}</td>
            </tr>
          ))}
        </tbody>

      </table>

      {/* RIGHT JOIN */}
      <h2>RIGHT JOIN</h2>

      <table className="table table-bordered mb-5">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {rightJoin.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
            </tr>
          ))}
        </tbody>

      </table>

      {/* FULL JOIN */}
      <h2>FULL JOIN</h2>

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {fullJoin.map((employee) => (
            <tr key={employee.emp_id}>
              <td>{employee.emp_id}</td>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.salary}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Reports;