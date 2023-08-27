import React from "react";
import { Container, Button, Col, Form, Row } from "react-bootstrap";

export default function UpdateNoteForm({
  animals,
  keepers,
  updatedNote,
  setUpdatedNote,
  updateNote,
  findAuthor,
  findSubject,
  setShowFormAlert,
}) {
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedNote((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault;

    if (Object.values(updatedNote).includes("")) {
      setUpdatedNote(null);
      setShowFormAlert(true);
      return;
    }
    updateNote(updatedNote);
    setUpdatedNote(null);
  };

  return (
    <div id="updateSection" className="text-white text center p-5 container">
      <h4 className="row">
        Update note by {findAuthor(updatedNote.keeperId, keepers)} about{" "}
        {findSubject(updatedNote.animalId, animals)}
      </h4>
      <Form>
        <Container>
          <Row>
            <Col sm>
              <Form.Group className="mb-3">
                <Form.Label>Note Text</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter the note here"
                  type="text"
                  name="noteText"
                  onChange={handleUpdateChange}
                  value={updatedNote.noteText}
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
          onClick={() => setUpdatedNote(null)}
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
