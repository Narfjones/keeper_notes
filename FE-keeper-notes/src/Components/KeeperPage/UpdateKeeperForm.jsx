import React from "react";
import { Container, Button, Col, Form, Row } from "react-bootstrap";

export default function UpdateKeeperForm({
  updatedKeeper,
  setUpdatedKeeper,
  updateKeeper,
}) {
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedKeeper((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault;
    updateKeeper(updatedKeeper);
    setUpdatedKeeper(null);
  };
  return (
    <div id="updateSection" className="text-white text center p-5 container">
      {console.log(updatedKeeper)}
      <h4 className="row">
        Update information for{" "}
        {updatedKeeper.firstName + " " + updatedKeeper.lastName}
      </h4>
      <Form>
        <Container>
          <Row>
            <Col xs>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  onChange={handleUpdateChange}
                  value={updatedKeeper.firstName}
                />
              </Form.Group>
            </Col>
            <Col xs>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  onChange={handleUpdateChange}
                  value={updatedKeeper.lastName}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3">
                <Form.Label>Radio Number (must be a whole number)</Form.Label>
                <Form.Control
                  type="number"
                  name="radioNumber"
                  onChange={handleUpdateChange}
                  value={updatedKeeper.radioNumber}
                />
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Form>
      <div className="row justify-content-around mt-3">
        <Button
          variant="light"
          className="col-3"
          onClick={() => setUpdatedKeeper(null)}
        >
          Close
        </Button>
        <Button variant="danger" className="col-3" onClick={handleUpdateSubmit}>
          Update
        </Button>
      </div>
    </div>
  );
}
