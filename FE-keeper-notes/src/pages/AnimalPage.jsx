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
import Animal from "../Components/Animal";

export default function Animals({
  animals,
  addNewAnimal,
  deleteAnimal,
  updateAnimal,
  showError,
  setShowError,
  errorMessage,
}) {
  const [showFormAlert, setShowFormAlert] = React.useState(false);
  const [newAnimal, setNewAnimal] = React.useState({
    species: "",
    commonName: "",
    animalName: "",
    location: "",
  });
  const [selectedAnimal, setSelectedAnimal] = React.useState({});
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [updatedAnimal, setUpdatedAnimal] = React.useState({});

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
    setShowUpdate(false);
  };
  return (
    <div className="mx-3">
      <h1 className="text-center m-3 text-white">Animals</h1>
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
                <Button variant="success" onClick={handleSubmit}>
                  Submit
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </div>
      <div className="animalTable bg-light m-3 p-3 table-responsive">
        <h3>Current Animals</h3>
        <Table className="text-center table-hover">
          <thead>
            <tr>
              <th>Species</th>
              <th>Common Name</th>
              <th>Name</th>
              <th>Location</th>
              <th>Assigned To</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => (
              <Animal
                key={animal.animalId}
                animal={animal}
                deleteAnimal={deleteAnimal}
                setUpdatedAnimal={setUpdatedAnimal}
                setShowUpdate={setShowUpdate}
              />
            ))}
          </tbody>
        </Table>
      </div>
      {showUpdate && (
        <div
          id="updateSection"
          className="text-white text center p-5 container"
        >
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
              onClick={() => setShowUpdate(false)}
            >
              Close
            </Button>
            <Button
              variant="danger"
              className="col-2 m-5"
              onClick={handleUpdateSubmit}
            >
              Update
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
