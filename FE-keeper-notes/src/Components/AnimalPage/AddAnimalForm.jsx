import React from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

export default function AddAnimalForm({
  addNewAnimal,
  setShowFormAlert,
  showError,
  showFormAlert,
  errorMessage,
  setShowError,
}) {
  const [newAnimal, setNewAnimal] = React.useState({
    species: "",
    commonName: "",
    animalName: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAnimal((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault;
    //console.log(newAnimal);

    if (Object.values(newAnimal).includes("")) {
      setShowFormAlert(true);
      return;
    }

    addNewAnimal(newAnimal);
    setNewAnimal({
      species: "",
      commonName: "",
      animalName: "",
      location: "",
    });
  };
  return (
    <div className="addAnimalForm p-3 mx-3 bg-light">
      <h3>Accession an animal</h3>
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
            <Col xs>
              <Form.Group className="mb-3">
                <Form.Label>Species</Form.Label>
                <Form.Control
                  placeholder="Species"
                  type="text"
                  name="species"
                  onChange={handleChange}
                  value={newAnimal.species}
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
                  onChange={handleChange}
                  value={newAnimal.commonName}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Name"
                  type="text"
                  name="animalName"
                  onChange={handleChange}
                  value={newAnimal.animalName}
                />
              </Form.Group>
            </Col>
            <Col xs>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  placeholder="Location"
                  type="text"
                  name="location"
                  onChange={handleChange}
                  value={newAnimal.location}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <Button variant="info" onClick={handleSubmit}>
                Submit
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );
}
