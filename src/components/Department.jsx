import { Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { AddDepModal } from "./AddDepModal";
import { EditDepModal } from "./EditDepModal";

export const Department = () => {
  const [deps, setDeps] = useState([]);
  const [showAddDepModal, setShowAddDepModal] = useState(false);
  const [showEditDepModal, setShowEditDepModal] = useState(false);
  const [selectedDep, setSelectedDep] = useState({
    DepartmentId: null,
    DepartmentName: "",
  });

  const fetchDepartments = async () => {
    const response = await fetch("https://localhost:7067/api/Department");
    const data = await response.json();
    setDeps(data);
  };

  // Fetch on initial load
  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAdd = () => {
    setShowAddDepModal(true);
  };

  const handleEdit = (depId, depName) => {
    setSelectedDep({ DepartmentId: depId, DepartmentName: depName });
    setShowEditDepModal(true);
  };

  const handleDelete = async (depId) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      const response = await fetch(
        "https://localhost:7067/api/Department/" + depId,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        fetchDepartments(); // Refresh the list after deletion
      } else {
        console.error("Failed to delete department", response.statusText);
      }
    }
  };

  return (
    <>
      <h3>This is the Department Page.</h3>
      <Table className="mt-4" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deps.map((dep) => (
            <tr key={dep.DepartmentId}>
              <td>{dep.DepartmentId}</td>
              <td>{dep.DepartmentName}</td>
              <td>
                <Button
                  className="me-2"
                  variant="primary"
                  onClick={() =>
                    handleEdit(dep.DepartmentId, dep.DepartmentName)
                  }
                >
                  Edit
                </Button>
                <Button
                  className="me-2"
                  variant="danger"
                  onClick={() => handleDelete(dep.DepartmentId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EditDepModal
        show={showEditDepModal}
        onHide={() => setShowEditDepModal(false)}
        depId={selectedDep.DepartmentId}
        depName={selectedDep.DepartmentName}
        onRefresh={fetchDepartments}
      />
      <Button variant="primary" onClick={handleAdd}>
        Add Department
      </Button>
      <AddDepModal
        show={showAddDepModal}
        onHide={() => setShowAddDepModal(false)}
        onRefresh={fetchDepartments}
      />
    </>
  );
};
