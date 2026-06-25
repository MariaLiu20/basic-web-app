import { Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { AddEmpModal } from "./AddEmpModal";
import { EditEmpModal } from "./EditEmpModal";

export const Employee = () => {
  const [emps, setEmps] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState({});
  const [showEditEmpModal, setShowEditEmpModal] = useState(false);
  const [showAddEmpModal, setShowAddEmpModal] = useState(false);

  const fetchEmployees = async () => {
    const response = await fetch("https://localhost:7067/api/Employee");
    const data = await response.json();
    setEmps(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAdd = () => {
    setShowAddEmpModal(true);
  };

  const handleEdit = (emp) => {
    setSelectedEmp(emp);
    setShowEditEmpModal(true);
  };

  const handleDelete = (empId) => {
    // Implementation for deleting an employee
    if (window.confirm("Are you sure you want to delete this employee?")) {
      fetch(`https://localhost:7067/api/Employee/${empId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            fetchEmployees();
          }
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
        });
    }
  };

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
      <EditEmpModal
        show={showEditEmpModal}
        onHide={() => setShowEditEmpModal(false)}
        emp={selectedEmp}
        onRefresh={fetchEmployees}
      />
      <Button variant="primary" onClick={handleAdd}>
        Add Employee
      </Button>
      <AddEmpModal
        show={showAddEmpModal}
        onHide={() => setShowAddEmpModal(false)}
        onRefresh={fetchEmployees}
      />
    </>
  );
};
