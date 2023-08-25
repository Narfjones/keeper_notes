import React from "react";
import {
  Alert,
  Col,
  Container,
  Form,
  Row,
  Button,
  Table,
} from "react-bootstrap";
import Note from "../Components/Note";

export default function NotePage({
  notes,
  animals,
  keepers,
  addNote,
  updateNote,
  showError,
  setShowError,
  errorMessage,
}) {
  const [showFormAlert, setShowFormAlert] = React.useState(false);
  const [newNote, setNewNote] = React.useState({
    noteText: "",
    keeperId: "",
    animalId: "",
  });
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [updatedNote, setUpdatedNote] = React.useState();
  const [selectedKeeperId, setSelectedKeeperId] = React.useState("");
  const [selectedAnimalId, setSelectedAnimalId] = React.useState("");
  const [showKeeperNotes, setShowKeeperNotes] = React.useState(false);
  const [showAnimalNotes, setShowAnimalNotes] = React.useState(false);

  //console.log("keepers", keepers);
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
  const findAuthor = (id, keeperArray) => {
    //console.log({ id });
    //console.log(keeperArray);
    const author = keeperArray.filter((keeper) => keeper.keeperId === id);
    //console.log(author);
    return author[0].firstName + " " + author[0].lastName;
  };

  const findSubject = (id, animalArray) => {
    const subject = animalArray.filter((animal) => animal.animalId === id);
    //console.log(subject);
    return subject[0].animalName;
  };

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
      setShowUpdate(false);
      setShowFormAlert(true);
      return;
    }
    updateNote(updatedNote);
    setShowUpdate(false);
  };

  const handleTableChoice = (e) => {
    const { name, value } = e.target;
    console.log(value);
    name === "keeperId"
      ? setSelectedKeeperId(value)
      : setSelectedAnimalId(value);
    //console.log(selectedKeeperId) + " in handle change";
  };

  return (
    <div className="mx-3">
      <h1 className="text-center m-3 text-white">Notes</h1>
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
                <Button
                  variant="info"
                  className="ms-auto"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </div>
      <div className="noteTable bg-light m-3 p-3 table-responsive">
        {selectedKeeperId === "" && selectedAnimalId === "" && (
          <h3>All Current Notes</h3>
        )}
        {selectedAnimalId != "" && selectedKeeperId === "" && (
          <h3>
            All notes about {findSubject(parseInt(selectedAnimalId), animals)}{" "}
          </h3>
        )}
        {selectedKeeperId != "" && selectedAnimalId === "" && (
          <h3>
            All notes from {findAuthor(parseInt(selectedKeeperId), keepers)}
          </h3>
        )}
        {selectedKeeperId != "" && selectedAnimalId != "" && (
          <h3>
            All notes from {findAuthor(parseInt(selectedKeeperId), keepers)}{" "}
            about {findSubject(parseInt(selectedAnimalId), animals)}
          </h3>
        )}
        <Container>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Filter by Keeper</Form.Label>
                  <Form.Select
                    name="keeperId"
                    onChange={handleTableChoice}
                    value={selectedKeeperId}
                  >
                    <option value="">All</option>
                    {keepers.map((keeper) => (
                      <option key={keeper.keeperId} value={keeper.keeperId}>
                        {keeper.firstName + " " + keeper.lastName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Filter by Animal</Form.Label>
                  <Form.Select
                    id="animalChoiceInput"
                    name="animalId"
                    onChange={handleTableChoice}
                    value={selectedAnimalId}
                  >
                    <option value="">All</option>
                    {animals.map((animal) => (
                      <option key={animal.animalId} value={animal.animalId}>
                        {animal.animalName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
        <Table className="text-center  table-hover ">
          <thead>
            <tr>
              <th>Created</th>
              <th>Note</th>
              <th>Author</th>
              <th>Subject</th>
              <th>Last Updated</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {notes
              .filter(
                (note) =>
                  (selectedAnimalId === "" ||
                    note.animalId === parseInt(selectedAnimalId)) &&
                  (selectedKeeperId === "" ||
                    note.keeperId === parseInt(selectedKeeperId))
              )
              .map((filteredNote) => (
                <Note
                  key={filteredNote.noteId}
                  note={filteredNote}
                  keepers={keepers}
                  animals={animals}
                  updateNote={updateNote}
                  setShowUpdate={setShowUpdate}
                  findAuthor={findAuthor}
                  findSubject={findSubject}
                  setUpdatedNote={setUpdatedNote}
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
              onClick={() => setShowUpdate(false)}
            >
              Close
            </Button>
            <Button
              variant="danger"
              className="col-3"
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
