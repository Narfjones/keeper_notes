import React from "react";
import { Button } from "react-bootstrap";

export default function Animal({
  animal,
  deleteAnimal,
  setUpdatedAnimal,
  setShowUpdate,
}) {
  return (
    <tr key={animal.animalId}>
      <td className="fst-italic">{animal.species}</td>
      <td>{animal.commonName}</td>
      <td>{animal.animalName}</td>
      <td>{animal.location}</td>
      <td>
        <ul>
          {animal.keepers.map((keeper, index) => (
            <li key={index}>{keeper}</li>
          ))}
        </ul>
      </td>
      <td>
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