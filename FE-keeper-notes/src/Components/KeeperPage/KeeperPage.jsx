import React from "react";
import { Button, Form, Alert } from "react-bootstrap";
import AddKeeperForm from "./AddKeeperForm";
import UpdateKeeperForm from "./UpdateKeeperForm";
import KeeperTable from "./KeeperTable";

export default function KeeperPage({
  keepers,
  animals,
  assignAnimal,
  dischargeAnimal,
  addNewKeeper,
  deleteKeeper,
  updateKeeper,
  showError,
  setShowError,
  errorMessage,
}) {
  const [showFormAlert, setShowFormAlert] = React.useState(false);
  const [selectedKeeper, setSelectedKeeper] = React.useState(null);
  const [animalId, setAnimalId] = React.useState("");
  const [showAssign, setShowAssign] = React.useState(false);
  const [showDischarge, setShowDischarge] = React.useState(false);
  const [updatedKeeper, setUpdatedKeeper] = React.useState(null);

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
  const handleDischargeSubmit = (e) => {
    e.preventDefault;
    dischargeAnimal(selectedKeeper.keeperId, animalId);
    setShowDischarge(false);
    setSelectedKeeper({});
    setAnimalId("");
  };

  return (
    <div className="mx-3">
      <h1 className="text-center m-3 text-white">Keepers</h1>
      <div className="addKeeperForm bg-light p-3 mx-3">
        <h3>Register a Keeper</h3>
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
        <AddKeeperForm
          addNewKeeper={addNewKeeper}
          setShowFormAlert={setShowFormAlert}
        />
      </div>
      <KeeperTable
        keepers={keepers}
        deleteKeeper={deleteKeeper}
        setShowAssign={setShowAssign}
        setShowDischarge={setShowDischarge}
        setSelectedKeeper={setSelectedKeeper}
        setUpdatedKeeper={setUpdatedKeeper}
      />
      {showAssign && (
        <div
          id="assignSection"
          className="text-white text center p-5 container"
        >
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
      )}
      {showDischarge && (
        <div
          id="dischargeSection"
          className="text-white text center p-5 container"
        >
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
      )}
      {updatedKeeper != null && (
        <UpdateKeeperForm
          updatedKeeper={updatedKeeper}
          setUpdatedKeeper={setUpdatedKeeper}
          updateKeeper={updateKeeper}
        />
      )}
    </div>
  );
}
