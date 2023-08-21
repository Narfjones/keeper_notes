import React from "react";
import KeeperOptions from "./KeeperOptions";
import { Button, Modal } from "react-bootstrap";

export default function KeeperTable({
  keeper,
  deleteKeeper,
  setShowUpdate,
  setShowAssign,
  setShowDischarge,
  setSelectedKeeper,
}) {
  return (
    <tr key={keeper.keeperId}>
      <td>{keeper.firstName + " " + keeper.lastName}</td>
      <td>{keeper.radioNumber}</td>
      <td>
        <ul>
          {keeper.animals.map((animal, index) => (
            <li key={index}>{animal}</li>
          ))}
        </ul>
      </td>
      <td>
        <>
          <Button
            variant="outline-info"
            onClick={() => {
              setShowAssign(true);
              setSelectedKeeper(keeper);
              scrollDown(assignSection);
            }}
          >
            Assign Animal
          </Button>
          <Button
            variant="outline-info"
            onClick={() => {
              setShowDischarge(true);
              setSelectedKeeper(keeper);
              scrollDown(dischargeSection);
            }}
          >
            Discharge Animal
          </Button>
          <Button variant="outline-info" onClick={() => setShowUpdate(true)}>
            Update Info
          </Button>
          <Button
            variant="outline-info"
            onClick={() => deleteKeeper(keeper.keeperId)}
          >
            Remove Keeper
          </Button>
        </>
      </td>
    </tr>
  );
}
