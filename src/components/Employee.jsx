import { Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";

export const Employee = () => {
  const [emps, setEmps] = useState([]);

  const fetchEmployees = async () => {
    const response = await fetch("https://localhost:7067/api/Employee");
    const data = await response.json();
    setEmps(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAdd = () => {};

  const handleEdit = (emp) => {
    setSelectedEmp(emp);
    setShowEditEmpModal(true);
  };

  const handleDelete = () => {};

  return (
    <>
      <h3>This is the Employee Page.</h3>
      <Table className="mt-4" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Date of Joining</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {emps.map((emp) => (
            <tr key={emp.EmployeeID}>
              <td>{emp.EmployeeID}</td>
              <td>{emp.EmployeeName}</td>
              <td>{emp.Department}</td>
              <td>{emp.MailID}</td>
              <td>{emp.DOJ}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(emp)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(emp.EmployeeID)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
