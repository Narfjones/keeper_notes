import React from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

export default function AddNoteForm({
  addNote,
  animals,
  keepers,
  showError,
  setShowError,
  errorMessage,
  showFormAlert,
  setShowFormAlert,
}) {
  const [newNote, setNewNote] = React.useState({
    noteText: "",
    keeperId: "",
    animalId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNote((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault;
    //console.log(newKeeper);

    if (Object.values(newNote).includes("")) {
      setShowFormAlert(true);
      return;
    }

    addNote(newNote);
    setNewNote({
      noteText: "",
      keeperId: "",
      animalId: "",
    });
  };
  return (
    <div className="addNoteForm bg-light p-3 mx-3">
      <h3>Create a Note</h3>
      <Alert
        show={showFormAlert}
        variant="danger"
        onClose={() => setShowFormAlert(false)}
        dismissible
      >
        You must select a keeper, an animal and include text to continue.
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
                <Form.Label>Animal</Form.Label>
                <Form.Select
                  id="animalInput"
                  name="animalId"
                  onChange={handleChange}
                  value={newNote.animalId}
                >
                  <option>Select</option>
                  {animals.map((animal) => (
                    <option key={animal.animalId} value={animal.animalId}>
                      {animal.animalName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm>
              <Form.Group className="mb-3">
                <Form.Label>Keeper</Form.Label>
                <Form.Select
                  id="keeperInput"
                  name="keeperId"
                  onChange={handleChange}
                  value={newNote.keeperId}
                >
                  <option>Select</option>
                  {keepers.map((keeper) => (
                    <option key={keeper.keeperId} value={keeper.keeperId}>
                      {keeper.firstName + " " + keeper.lastName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm>
              <Form.Group className="mb-3">
                <Form.Label>Note Text</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter the note here"
                  type="text"
                  name="noteText"
                  onChange={handleChange}
                  value={newNote.noteText}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
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
