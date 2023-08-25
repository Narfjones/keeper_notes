import React from "react";
import { Alert } from "react-bootstrap";
import AddAnimalForm from "./AddAnimalForm";
import UpdateAnimalForm from "./UpdateAnimalForm";
import AnimalTable from "./AnimalTable";

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
  const [updatedAnimal, setUpdatedAnimal] = React.useState(null);

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
        <AddAnimalForm
          addNewAnimal={addNewAnimal}
          setShowFormAlert={setShowFormAlert}
        />
      </div>
      <AnimalTable
        animals={animals}
        deleteAnimal={deleteAnimal}
        setUpdatedAnimal={setUpdatedAnimal}
      />
      {updatedAnimal != null && (
        <UpdateAnimalForm
          updatedAnimal={updatedAnimal}
          setUpdatedAnimal={setUpdatedAnimal}
          updateAnimal={updateAnimal}
        />
      )}
    </div>
  );
}
