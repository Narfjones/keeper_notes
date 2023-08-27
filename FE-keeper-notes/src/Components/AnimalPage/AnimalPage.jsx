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

      <AddAnimalForm
        addNewAnimal={addNewAnimal}
        showError={showError}
        setShowError={setShowError}
        errorMessage={errorMessage}
        setShowFormAlert={setShowFormAlert}
        showFormAlert={showFormAlert}
      />
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
