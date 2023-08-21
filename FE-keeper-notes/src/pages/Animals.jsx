import React from "react";
import {
  Alert,
  Col,
  Container,
  Form,
  Row,
  Table,
  Button,
} from "react-bootstrap";

export default function Animals({
  animals,
  addNewAnimal,
  deleteAnimal,
  showError,
  setShowError,
  errorMessage,
}) {
  const [show, setShow] = React.useState(false);
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
      setShow(true);
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
    <div>
      <h1 className="text-center">Animals</h1>
      <div className="addAnimalForm">
        <h3>Accession an animal</h3>
        <Alert
          show={show}
          variant="danger"
          onClose={() => setShow(false)}
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
              <Col>
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
              <Col>
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
            </Row>
            <Row>
              <Col>
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
              <Col md={{ span: 4, offset: 5 }}>
                <Button variant="success" onClick={handleSubmit}>
                  Submit
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </div>
      <div className="animalTable table-responsive">
        <h3>Current Animals</h3>
        <Table className="text-center">
          <thead>
            <tr>
              <th>Species</th>
              <th>Common Name</th>
              <th>Name</th>
              <th>Location</th>
              <th>Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => (
              <tr key={animal.animalId}>
                <td className="fst-italic">{animal.species}</td>
                <td>{animal.commonName}</td>
                <td>{animal.animalName}</td>
                <td>{animal.location}</td>
                <td>
                  <ul>
                    {animal.keepers.map((keeper, index) => (
                      <li key={index}>{keeper}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteAnimal(animal.animalId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
