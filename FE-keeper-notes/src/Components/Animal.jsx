import React from "react";
import { Button } from "react-bootstrap";

export default function Animal({
  animal,
  deleteAnimal,
  setUpdatedAnimal,
  setShowUpdate,
}) {
  return (
    <tr className="row" key={animal.animalId}>
      <td className="col-2 fst-italic">{animal.species}</td>
      <td className="col-2">{animal.commonName}</td>
      <td className="col-1">{animal.animalName}</td>
      <td className="col-2">{animal.location}</td>
      <td className="col-2">
        <ul>
          {animal.keepers.map((keeper, index) => (
            <li key={index}>{keeper}</li>
          ))}
        </ul>
      </td>
      <td className="col-3">
        <Button
          className="btn-sm m-1"
          variant="info"
          onClick={() => {
            setShowUpdate(true);
            setUpdatedAnimal(animal);
          }}
        >
          Update
        </Button>
        <Button
          className="btn-sm m-1"
          variant="danger"
          onClick={() => deleteAnimal(animal.animalId)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}
