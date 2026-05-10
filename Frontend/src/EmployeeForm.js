import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeForm = ({
  onAddEmployee,
  onUpdateEmployee,
  selectedEmployee,
  onClearSelection
}) => {

  const [employee, setEmployee] = useState({
    name: '',
    position: '',
    salary: '',
    email: '',
    phone: '',
    hire_date: ''
  });

  useEffect(() => {
    if (selectedEmployee) {
      setEmployee({
        name: selectedEmployee.name,
        position: selectedEmployee.position,
        salary: selectedEmployee.salary || '',
        email: selectedEmployee.email || '',
        phone: selectedEmployee.phone || '',
        hire_date: selectedEmployee.hire_date || ''
      });
    } else {
      setEmployee({
        name: '',
        position: '',
        salary: '',
        email: '',
        phone: '',
        hire_date: ''
      });
    }
  }, [selectedEmployee]);

  const handleInputChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const addOrUpdateEmployee = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login required");
      return;
    }

    try {
      if (selectedEmployee) {
        // UPDATE
        await axios.put(
          `http://localhost:5000/employees/${selectedEmployee.id}`,
          employee,
          { headers: { Authorization: token } }
        );

        onUpdateEmployee();
        onClearSelection();
        alert("Employee updated");

      } else {
        // ADD
        await axios.post(
          'http://localhost:5000/employees',
          employee,
          { headers: { Authorization: token } }
        );

        onAddEmployee();
        alert("Employee added");
      }

      // RESET FORM
      setEmployee({
        name: '',
        position: '',
        salary: '',
        email: '',
        phone: '',
        hire_date: ''
      });

    } catch (err) {
      console.error("ADD ERROR:", err);
      alert("Error adding employee");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h3>{selectedEmployee ? 'Edit Employee' : 'Add Employee'}</h3>

        <input
          className="form-control mb-2"
          name="name"
          placeholder="Name"
          value={employee.name}
          onChange={handleInputChange}
        />

        <input
          className="form-control mb-2"
          name="position"
          placeholder="Position"
          value={employee.position}
          onChange={handleInputChange}
        />

        <input
          className="form-control mb-2"
          name="salary"
          placeholder="Salary"
          value={employee.salary}
          onChange={handleInputChange}
        />

        <input
          className="form-control mb-2"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleInputChange}
        />

        <input
          className="form-control mb-2"
          name="phone"
          placeholder="Phone"
          value={employee.phone}
          onChange={handleInputChange}
        />

        <input
          type="date"
          className="form-control mb-2"
          name="hire_date"
          value={employee.hire_date}
          onChange={handleInputChange}
        />

        <button
          className="btn btn-success"
          onClick={addOrUpdateEmployee}
        >
          {selectedEmployee ? 'Update' : 'Add'}
        </button>

        {selectedEmployee && (
          <button
            className="btn btn-secondary ms-2"
            onClick={onClearSelection}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default EmployeeForm;