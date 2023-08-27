import React from "react";
import { Button, Form } from "react-bootstrap";

export default function AssignCare({
  assignAnimal,
  setShowAssign,
  animals,
  selectedKeeper,
  setSelectedKeeper,
}) {
  const [animalId, setAnimalId] = React.useState("");
  const handleAssignmentChange = (e) => {
    const { value } = e.target;
    setAnimalId(value);
  };

  const handleAssignSubmit = (e) => {
    e.preventDefault;
    assignAnimal(selectedKeeper.keeperId, animalId);
    setShowAssign(false);
    setSelectedKeeper({});
    setAnimalId("");
  };
  return (
    <div id="assignSection" className="text-white text center p-5 container">
      <h4 className="row">
        Select an animal to assign to{" "}
        {selectedKeeper.firstName + " " + selectedKeeper.lastName}
      </h4>
      <Form className="row justify-content-center">
        <Form.Group className="mb-3 col-8">
          <Form.Label className="my-3">Available animals</Form.Label>
          <Form.Select
            id="animalInput"
            name="animalId"
            onChange={handleAssignmentChange}
            value={animalId}
          >
            <option>Select</option>
            {animals.map((animal) => (
              <option key={animal.animalId} value={animal.animalId}>
                {animal.animalName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
      <div className="row justify-content-around mt-3">
        <Button
          variant="light"
          className="col-3"
          onClick={() => setShowAssign(false)}
        >
          Close
        </Button>
        <Button
          variant="success"
          className="col-3"
          onClick={handleAssignSubmit}
        >
          Assign
        </Button>
      </div>
    </div>
  );
}
