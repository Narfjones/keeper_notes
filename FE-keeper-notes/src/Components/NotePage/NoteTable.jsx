import React from "react";
import Note from "./Note";
import { Container, Row, Col, Form, Table } from "react-bootstrap";

export default function NoteTable({
  notes,
  keepers,
  animals,
  findSubject,
  findAuthor,
  updateNote,
  setUpdatedNote,
}) {
  const [selectedKeeperId, setSelectedKeeperId] = React.useState("");
  const [selectedAnimalId, setSelectedAnimalId] = React.useState("");

  const handleTableChoice = (e) => {
    const { name, value } = e.target;
    //console.log(value);
    name === "keeperId"
      ? setSelectedKeeperId(value)
      : setSelectedAnimalId(value);
    //console.log(selectedKeeperId) + " in handle change";
  };
  return (
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
          All notes from {findAuthor(parseInt(selectedKeeperId), keepers)} about{" "}
          {findSubject(parseInt(selectedAnimalId), animals)}
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
                findAuthor={findAuthor}
                findSubject={findSubject}
                setUpdatedNote={setUpdatedNote}
              />
            ))}
        </tbody>
      </Table>
    </div>
  );
}
