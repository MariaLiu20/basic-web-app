import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

export const AddEmpModal = ({ show, onHide, onRefresh }) => {
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "" });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const employeeName = event.target.EmployeeName.value;
    const department = event.target.Department.value;
    const email = event.target.MailID.value;
    const doj = event.target.DOJ.value;
    try {
      const response = await fetch("https://localhost:7067/api/Employee", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          EmployeeName: employeeName,
          Department: department,
          MailID: email,
          DOJ: doj,
        }),
      });
      if (response.ok) {
        setSnackbar({ open: true, message: "Employee added successfully" });
        onRefresh();
      }
    } catch (error) {
      console.error("Error:", error);
      setSnackbar({ open: true, message: "Error adding employee" });
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
            <Modal.Title>Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form.Group controlId="EmployeeName">
                  <Form.Label>Employee Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmployeeName"
                    required
                    placeholder="Employee Name"
                  />
                </Form.Group>
                <Form.Group controlId="Department">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="text"
                    name="Department"
                    required
                    placeholder="Department"
                  />
                </Form.Group>
                <Form.Group controlId="MailID">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="MailID"
                    required
                    placeholder="Email"
                  />
                </Form.Group>
                <Form.Group controlId="DOJ">
                  <Form.Label>Date of Joining</Form.Label>
                  <Form.Control type="date" name="DOJ" required />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Add Employee
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
