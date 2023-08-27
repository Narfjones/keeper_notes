import React from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

export default function AddKeeperForm({
  addNewKeeper,
  showError,
  setShowError,
  errorMessage,
  setShowFormAlert,
  showFormAlert,
}) {
  const [newKeeper, setNewKeeper] = React.useState({
    firstName: "",
    lastName: "",
    radioNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewKeeper((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault;
    //console.log(newKeeper);

    if (Object.values(newKeeper).includes("")) {
      setShowFormAlert(true);
      return;
    }

    addNewKeeper(newKeeper);
    setNewKeeper({
      firstName: "",
      lastName: "",
      radioNumber: "",
    });
  };
  return (
    <div className="addKeeperForm bg-light p-3 mx-3">
      <h3>Register a Keeper</h3>
      <Alert
        show={showFormAlert}
        variant="danger"
        onClose={() => setShowFormAlert(false)}
        dismissible
      >
        You must enter information into all fields to continue
      </Alert>
      <Alert
        show={showError}
        variant="danger"
        onClose={() => setShowError(false)}
        dismissible
      >
        {errorMessage}
      </Alert>
      <Form>
        <Container>
          <Row>
            <Col sm>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  value={newKeeper.firstName}
                />
              </Form.Group>
            </Col>
            <Col sm>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  value={newKeeper.lastName}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Label>Radio Number (must be a whole number)</Form.Label>
                <Form.Control
                  placeholder="Enter a whole number"
                  type="number"
                  name="radioNumber"
                  onChange={handleChange}
                  value={newKeeper.radioNumber}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <Button variant="info" className="ms-auto" onClick={handleSubmit}>
                Submit
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );
}
