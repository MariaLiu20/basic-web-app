import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export const AddDepModal = ({ show, onHide }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    const departmentName = event.target.DepartmentName.value;
    console.log("Department Name:", departmentName);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form.Group controlId="DepartmentName">
                <Form.Label>Department Name</Form.Label>
                <Form.Control
                  type="text"
                  name="DepartmentName"
                  required
                  placeholder="Department Name"
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Add Department
          </Button>
          <Button variant="danger" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
