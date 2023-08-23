import React from "react";

import { Button, Modal } from "react-bootstrap";

export default function Keeper({
  keeper,
  deleteKeeper,
  setShowUpdate,
  setShowAssign,
  setShowDischarge,
  setSelectedKeeper,
  setUpdatedKeeper,
}) {
  return (
    <tr className="row" key={keeper.keeperId}>
      <td className="col-3">{keeper.firstName + " " + keeper.lastName}</td>
      <td className="col-2">{keeper.radioNumber}</td>
      <td className="col-4">
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
            variant="primary"
            onClick={() => {
              setShowAssign(true);
              setSelectedKeeper(keeper);
            }}
          >
            Assign
          </Button>
          <Button
            className="btn-sm mx-1 my-1"
            variant="primary"
            onClick={() => {
              setShowDischarge(true);
              setSelectedKeeper(keeper);
            }}
          >
            Discharge
          </Button>
          <Button
            className="btn-sm mx-1 my-1"
            variant="primary"
            onClick={() => {
              setShowUpdate(true);
              setUpdatedKeeper(keeper);
            }}
          >
            Update
          </Button>
          <Button
            className="btn-sm mx-1 my-1"
            variant="primary"
            onClick={() => deleteKeeper(keeper.keeperId)}
          >
            Remove
          </Button>
        </div>
      </td>
    </tr>
  );
}
