import React from "react";
import { Button, Container, Row } from "react-bootstrap";

export default function KeeperOptions({
  keeper,
  deleteKeeper,
  assignAnimal,
  animals,
}) {
  console.log(animals);
  return (
    <Container>
      <Row>
        <p>Delete this keeper</p>
        <Button
          variant="outline-danger"
          onClick={() => deleteKeeper(keeper.keeperId)}
        >
          Delete
        </Button>
      </Row>
      <hr></hr>
      <Row>
        <ul>
          {animals.map((animal) => {
            <li key={animal.animalId}>
              {animal.animalName}{" "}
              <Button
                onClick={() => assignAnimal(keeper.keeperId, animal.animalId)}
              >
                Assign
              </Button>
            </li>;
          })}
        </ul>
      </Row>
    </Container>
  );
}
