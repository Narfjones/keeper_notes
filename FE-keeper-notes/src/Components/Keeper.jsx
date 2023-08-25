import React from "react";

import { Button, Modal } from "react-bootstrap";

export default function KeeperTable({
  keeper,
  deleteKeeper,
  setShowUpdate,
  setShowAssign,
  setShowDischarge,
  setSelectedKeeper,
  setUpdatedKeeper,
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
      <td className="col-3">
        <div>
          <Button
            className="btn-sm mx-1 my-1"
            variant="dark"
            onClick={() => {
              setShowAssign(true);
              setSelectedKeeper(keeper);
            }}
          >
            Assign
          </Button>
          <Button
            className="btn-sm mx-1 my-1"
            variant="dark"
            onClick={() => {
              setShowDischarge(true);
              setSelectedKeeper(keeper);
            }}
          >
            Discharge
          </Button>
          <Button
            className="btn-sm mx-1 my-1"
            variant="dark"
            onClick={() => {
              setShowUpdate(true);
              setUpdatedKeeper(keeper);
            }}
          >
            Update
          </Button>
          <Button
            className="btn-sm mx-1 my-1"
            variant="dark"
            onClick={() => deleteKeeper(keeper.keeperId)}
          >
            Remove
          </Button>
        </div>
      </td>
    </tr>
  );
}
