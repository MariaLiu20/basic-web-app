import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

export const EditDepModal = ({ show, onHide, onRefresh, depId, depName }) => {
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "" });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const departmentId = event.target.DepartmentId.value;
    const departmentName = event.target.DepartmentName.value;
    try {
      const response = await fetch("https://localhost:7067/api/Department", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          DepartmentId: departmentId,
          DepartmentName: departmentName,
        }),
      });
      if (response.ok) {
        setSnackbar({ open: true, message: "Department updated successfully" });
        onRefresh();
      }
    } catch (error) {
      console.error("Error:", error);
      setSnackbar({ open: true, message: "Error adding department" });
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
            <Modal.Title>Edit Department</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form.Group controlId="DepartmentId">
                  <Form.Label>Department ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="DepartmentId"
                    required
                    disabled
                    defaultValue={depId}
                    placeholder="Department ID"
                  />
                </Form.Group>
                <Form.Group controlId="DepartmentName">
                  <Form.Label>Department Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="DepartmentName"
                    required
                    defaultValue={depName}
                    placeholder="Department Name"
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
