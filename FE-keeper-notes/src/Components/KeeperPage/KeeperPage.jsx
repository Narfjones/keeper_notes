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
import Keeper from "./Keeper";

export default function Keepers({
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
  const [updatedKeeper, setUpdatedKeeper] = React.useState({});

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

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedKeeper((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault;
    updateKeeper(updatedKeeper);
    setShowUpdate(false);
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
        <Form>
          <Container>
            <Row>
              <Col sm>
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
              <Col sm>
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
              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Radio Number (must be a whole number)</Form.Label>
                  <Form.Control
                    placeholder="Enter a whole number"
                    type="number"
                    name="radioNumber"
                    onChange={handleChange}
                    value={newKeeper.radioNumber}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
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
      <div className="keeperTable bg-light m-3 p-3 table-responsive">
        <h3>Registered Keepers</h3>
        <Table className="text-center  table-hover ">
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
              <Keeper
                key={keeper.keeperId}
                keeper={keeper}
                deleteKeeper={deleteKeeper}
                setShowAssign={setShowAssign}
                setShowUpdate={setShowUpdate}
                setShowDischarge={setShowDischarge}
                setSelectedKeeper={setSelectedKeeper}
                setUpdatedKeeper={setUpdatedKeeper}
              />
            ))}
          </tbody>
        </Table>
      </div>
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
      {showUpdate && (
        <div
          id="updateSection"
          className="text-white text center p-5 container"
        >
          {console.log(updatedKeeper)}
          <h4 className="row">
            Update information for{" "}
            {updatedKeeper.firstName + " " + updatedKeeper.lastName}
          </h4>
          <Form>
            <Container>
              <Row>
                <Col xs>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      onChange={handleUpdateChange}
                      value={updatedKeeper.firstName}
                    />
                  </Form.Group>
                </Col>
                <Col xs>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      onChange={handleUpdateChange}
                      value={updatedKeeper.lastName}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Radio Number (must be a whole number)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="radioNumber"
                      onChange={handleUpdateChange}
                      value={updatedKeeper.radioNumber}
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
