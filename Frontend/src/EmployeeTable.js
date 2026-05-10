import React from 'react';
import axios from 'axios';

const EmployeeTable = ({
  employees,
  onDeleteEmployee,
  onSelectEmployee
}) => {

  const deleteEmployee = (id) => {

    axios.delete(`http://localhost:5000/employees/${id}`)
      .then(() => {

        onDeleteEmployee(id);
        alert("Employee deleted");

      })
      .catch(err => {

        console.error("DELETE ERROR:", err);
        alert("Delete failed");

      });
  };

  return (

    <div className="card mt-4">

      <div className="card-body">

        <h2 className="card-title">
          Employee List
        </h2>

        <table className="table table-bordered table-striped">

          <thead className="table-dark">

            <tr>

              <th style={{ minWidth: "70px" }}>
                ID
              </th>

              <th>Name</th>

              <th>Position</th>

              <th>Salary</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Hire Date</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {employees.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="text-center"
                >
                  No employees found
                </td>

              </tr>

            ) : (

              employees.map(employee => (

                <tr key={employee.emp_id}>

                  <td style={{ fontWeight: "bold" }}>
                    {employee.emp_id}
                  </td>

                  <td>
                    {employee.name}
                  </td>

                  <td>
                    {employee.position || '-'}
                  </td>

                  <td>
                    {employee.salary || '-'}
                  </td>

                  <td>
                    {employee.email || '-'}
                  </td>

                  <td>
                    {employee.phone || '-'}
                  </td>

                  <td>
                    {employee.hire_date
                      ? new Date(employee.hire_date)
                          .toLocaleDateString()
                      : '-'}
                  </td>

                  <td>

                    <button
                      className="btn btn-warning me-2"
                      onClick={() =>
                        onSelectEmployee(employee)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        deleteEmployee(employee.emp_id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default EmployeeTable;