import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

export const EditEmpModal = ({ show, onHide, onRefresh, emp }) => {
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const { EmployeeID, EmployeeName, Department, MailID, DOJ } = emp;

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "" });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const empId = event.target.EmployeeID.value;
    const empName = event.target.EmployeeName.value;
    const department = event.target.Department.value;
    const email = event.target.MailID.value;
    const doj = event.target.DOJ.value;
    try {
      const response = await fetch("https://localhost:7067/api/Employee", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          EmployeeID: empId,
          EmployeeName: empName,
          Department: department,
          MailID: email,
          DOJ: doj,
        }),
      });
      if (response.ok) {
        setSnackbar({ open: true, message: "Employee updated successfully" });
        onRefresh();
      }
    } catch (error) {
      console.error("Error:", error);
      setSnackbar({ open: true, message: "Error updating employee" });
      return;
    } finally {
      onHide();
    }
  };
  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            x
          </IconButton>,
        ]}
      />
      <Modal show={show} onHide={onHide}>
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form.Group controlId="EmployeeID">
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmployeeID"
                    required
                    disabled
                    defaultValue={EmployeeID}
                    placeholder="Employee ID"
                  />
                </Form.Group>
                <Form.Group controlId="EmployeeName">
                  <Form.Label>Employee Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmployeeName"
                    required
                    defaultValue={EmployeeName}
                    placeholder="Employee Name"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Update
            </Button>
            <Button variant="danger" onClick={onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
