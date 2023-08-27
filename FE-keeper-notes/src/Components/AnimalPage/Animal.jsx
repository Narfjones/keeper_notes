import React from "react";
import { Button } from "react-bootstrap";
import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";

export default function Animal({ animal, deleteAnimal, setUpdatedAnimal }) {
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
      <td className="col-3">
        <Button
          className=" m-1 p-1"
          variant="info"
          onClick={() => {
            setUpdatedAnimal(animal);
          }}
          title="Edit"
        >
          <FaPenToSquare />
        </Button>
        <Button
          className=" m-1 p-1"
          variant="danger"
          onClick={() => deleteAnimal(animal.animalId)}
          title="Delete"
        >
          <FaTrashCan />
        </Button>
      </td>
    </tr>
  );
}
