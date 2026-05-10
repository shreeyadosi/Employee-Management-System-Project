import Signup from './Signup';
import Login from './Login';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';
import Reports from './Reports';
import Footer from './Footer';

function App() {

  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [view, setView] = useState('employees');

  const [role, setRole] = useState(localStorage.getItem('role'));
  const [authPage, setAuthPage] = useState("login");

  // ================= FETCH EMPLOYEES =================
  const fetchEmployees = useCallback(() => {

    axios.get('http://localhost:5000/employees')
      .then(res => setEmployees(res.data))
      .catch(err => console.error("FETCH ERROR:", err));

  }, []);

  useEffect(() => {
    if (role) {
      fetchEmployees();
    }
  }, [fetchEmployees, role]);

  // ================= CRUD =================
  const addEmployee = () => {
    fetchEmployees();
  };

  const updateEmployee = () => {
    fetchEmployees();
  };

  const deleteEmployee = (id) => {

    axios.delete(`http://localhost:5000/employees/${id}`)
      .then(() => fetchEmployees())
      .catch(err => console.error(err));
  };

  const selectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const clearSelection = () => {
    setSelectedEmployee(null);
  };

  // ================= LOGIN / SIGNUP =================
  if (!role) {

    return authPage === "login"
      ? (
        <Login
          onLogin={setRole}
          goToSignup={() => setAuthPage("signup")}
        />
      )
      : (
        <Signup
          goToLogin={() => setAuthPage("login")}
        />
      );
  }

  return (

    <div className="container mt-5">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Employee Management System</h2>

        <button
          className="btn btn-danger"
          onClick={() => {
            localStorage.clear();
            setRole(null);
            setEmployees([]);
          }}
        >
          Logout
        </button>

      </div>

      {/* NAVIGATION */}
      <div className="mb-4">

        <button
          className={`btn ${view === 'employees'
            ? 'btn-primary'
            : 'btn-secondary'} me-2`}
          onClick={() => setView('employees')}
        >
          Manage Employees
        </button>

        {/* ADMIN ONLY REPORTS */}
        {role === 'admin' && (

          <button
            className={`btn ${view === 'reports'
              ? 'btn-primary'
              : 'btn-secondary'}`}
            onClick={() => setView('reports')}
          >
            View Reports
          </button>

        )}

      </div>

      {/* MAIN VIEW */}
      {view === 'employees' ? (

        <div className="row">

          {/* FORM */}
          <div className="col-md-6">

            <EmployeeForm
              onAddEmployee={addEmployee}
              onUpdateEmployee={updateEmployee}
              selectedEmployee={selectedEmployee}
              onClearSelection={clearSelection}
            />

          </div>

          {/* TABLE */}
          <div className="col-md-6">

            {role === 'admin' ? (

              <EmployeeTable
                employees={employees}
                onDeleteEmployee={deleteEmployee}
                onSelectEmployee={selectEmployee}
              />

            ) : (

              <div className="alert alert-info">
                Employees are not allowed to view the employee list.
              </div>

            )}

          </div>

        </div>

      ) : (

        <Reports />

      )}

      <Footer />

    </div>
  );
}

export default App;