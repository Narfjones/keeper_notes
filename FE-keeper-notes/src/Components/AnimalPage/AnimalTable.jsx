import React from "react";
import Animal from "./Animal";
import { Table } from "react-bootstrap";

export default function AnimalTable({
  animals,
  deleteAnimal,
  setUpdatedAnimal,
}) {
  return (
    <div className="animalTable bg-light m-3 p-3 table-responsive">
      <h3>Current Animals</h3>
      {animals.length === 0 && (
        <h4>***There are no animals currently accessioned***</h4>
      )}
      <Table className="text-center table-hover">
        <thead>
          <tr>
            <th>Species</th>
            <th>Common Name</th>
            <th>Name</th>
            <th>Location</th>
            <th>Assigned To</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <Animal
              key={animal.animalId}
              animal={animal}
              deleteAnimal={deleteAnimal}
              setUpdatedAnimal={setUpdatedAnimal}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}
