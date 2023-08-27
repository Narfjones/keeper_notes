import React from "react";
import { Button, Form } from "react-bootstrap";

export default function DischargeCare({
  dischargeAnimal,
  animals,
  setShowDischarge,
  selectedKeeper,
  setSelectedKeeper,
}) {
  const [animalId, setAnimalId] = React.useState("");

  const handleAssignmentChange = (e) => {
    const { value } = e.target;
    setAnimalId(value);
  };

  const handleDischargeSubmit = (e) => {
    e.preventDefault;
    dischargeAnimal(selectedKeeper.keeperId, animalId);
    setShowDischarge(false);
    setSelectedKeeper({});
    setAnimalId("");
  };

  return (
    <div id="dischargeSection" className="text-white text center p-5 container">
      <h4 className="row">
        Select an animal to discharge from{" "}
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
          onClick={() => setShowDischarge(false)}
        >
          Close
        </Button>
        <Button
          variant="danger"
          className="col-3"
          onClick={handleDischargeSubmit}
        >
          Discharge
        </Button>
      </div>
    </div>
  );
}
