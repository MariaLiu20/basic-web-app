import { Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { AddDepModal } from "./AddDepModal";

export const Department = () => {
  const [deps, setDeps] = useState([
    { DepartmentID: 1, DepartmentName: "IT" },
    { DepartmentID: 2, DepartmentName: "HR" },
  ]);
  const [showAddDepModal, setShowAddDepModal] = useState(false);

  useEffect(() => {
    fetch("https://localhost:7067/api/Department")
      .then((response) => response.json())
      .then((data) => setDeps(data));
  }, []);

  const handleClick = () => {
    console.log("Add Department button clicked");
    setShowAddDepModal(true);
  };

  return (
    <>
      <h3>This is the Department Page.</h3>
      <Table className="mt-4" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
          </tr>
        </thead>
        <tbody>
          {deps.map((dep) => (
            <tr key={dep.DepartmentId}>
              <td>{dep.DepartmentId}</td>
              <td>{dep.DepartmentName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleClick}>
        Add Department
      </Button>
      <AddDepModal
        show={showAddDepModal}
        onHide={() => setShowAddDepModal(false)}
      />
    </>
  );
};
