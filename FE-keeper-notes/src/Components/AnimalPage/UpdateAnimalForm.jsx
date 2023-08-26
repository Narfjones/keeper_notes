import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export default function UpdateAnimalForm({
  updatedAnimal,
  setUpdatedAnimal,
  updateAnimal,
}) {
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAnimal((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault;
    updateAnimal(updatedAnimal);
    setUpdatedAnimal(null);
  };

  return (
    <div id="updateSection" className="text-white text center p-5 container">
      <h4 className="row">
        Update information for{" "}
        {updatedAnimal.commonName + ": " + updatedAnimal.animalName}
      </h4>
      <Form>
        <Container>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Species</Form.Label>
                <Form.Control
                  placeholder="Species"
                  type="text"
                  name="species"
                  onChange={handleUpdateChange}
                  value={updatedAnimal.species}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Common Name</Form.Label>
                <Form.Control
                  placeholder="Common Name"
                  type="text"
                  name="commonName"
                  onChange={handleUpdateChange}
                  value={updatedAnimal.commonName}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Name"
                  type="text"
                  name="animalName"
                  onChange={handleUpdateChange}
                  value={updatedAnimal.animalName}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  placeholder="Location"
                  type="text"
                  name="location"
                  onChange={handleUpdateChange}
                  value={updatedAnimal.location}
                />
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Form>
      <div className="row justify-content-center">
        <Button
          variant="light"
          className="col-2 m-5"
          onClick={() => setUpdatedAnimal(null)}
        >
          Close
        </Button>
        <Button
          variant="info"
          className="col-2 m-5"
          onClick={handleUpdateSubmit}
        >
          Update
        </Button>
      </div>
    </div>
  );
}
