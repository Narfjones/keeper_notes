import React from "react";
import {
  Button,
  Table,
  Form,
  Alert,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import KeeperTable from "../src/Components/KeeperTable";

export default function Keepers({
  keepers,
  animals,
  assignAnimal,
  dischargeAnimal,
  addNewKeeper,
  deleteKeeper,
  showError,
  setShowError,
  errorMessage,
}) {
  const emptyKeeper = {
    firstName: "",
    lastName: "",
    radioNumber: "",
  };

  const [showFormAlert, setShowFormAlert] = React.useState(false);
  const [selectedKeeper, setSelectedKeeper] = React.useState({});
  const [animalId, setAnimalId] = React.useState("");
  const [showAssign, setShowAssign] = React.useState(false);
  const [showDischarge, setShowDischarge] = React.useState(false);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [newKeeper, setNewKeeper] = React.useState(emptyKeeper);
  const [updateKeeper, setUpdateKeeper] = React.useState(emptyKeeper);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewKeeper((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault;
    //console.log(newKeeper);

    if (Object.values(newKeeper).includes("")) {
      setShow(true);
      return;
    }

    addNewKeeper(newKeeper);
    setNewKeeper({
      firstName: "",
      lastName: "",
      radioNumber: "",
    });
  };

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
    <div>
      <h1 className="text-center">Keepers</h1>
      <div className="addKeeperForm">
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
        <Form>
          <Container>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    placeholder="First Name"
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    value={newKeeper.firstName}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    value={newKeeper.lastName}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Radio Number (must be a whole number)</Form.Label>
                  <Form.Control
                    placeholder="Enter a whole number without a decimal"
                    type="number"
                    name="radioNumber"
                    onChange={handleChange}
                    value={newKeeper.radioNumber}
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
      <h1>Registered Keepers</h1>
      <Table className="text-center">
        <thead>
          <tr>
            <th>Keeper Name</th>
            <th>Radio Number</th>
            <th>Assigned animals</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {keepers.map((keeper) => (
            <KeeperTable
              key={keeper.keeperId}
              keeper={keeper}
              deleteKeeper={deleteKeeper}
              setShowAssign={setShowAssign}
              setShowUpdate={setShowUpdate}
              setShowDischarge={setShowDischarge}
              setSelectedKeeper={setSelectedKeeper}
            />
          ))}
        </tbody>
      </Table>
      {showAssign && (
        <div id="assignSection" className="text-white p-5">
          <h4>
            Select an animal to assign to{" "}
            {selectedKeeper.firstName + " " + selectedKeeper.lastName}
          </h4>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Available animals</Form.Label>
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
            <Button onClick={() => setShowAssign(false)}>Close</Button>
            <Button onClick={handleAssignSubmit}>Assign</Button>
          </Form>
        </div>
      )}
      {showDischarge && (
        <div id="dischargeSection" className="text-white p-5">
          <h4>
            Select an animal to discharge from{" "}
            {selectedKeeper.firstName + " " + selectedKeeper.lastName}
          </h4>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Available animals</Form.Label>
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
            <Button onClick={() => setShowDischarge(false)}>Close</Button>
            <Button onClick={handleDischargeSubmit}>Discharge</Button>
          </Form>
        </div>
      )}
    </div>
  );
}
