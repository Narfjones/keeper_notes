import React from "react";
import {
  FaTrashCan,
  FaPenToSquare,
  FaHeartCirclePlus,
  FaHeartCircleMinus,
} from "react-icons/fa6";

import { Button, Modal } from "react-bootstrap";

export default function Keeper({
  keeper,
  deleteKeeper,
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
      <td>
        <div>
          <Button
            className="btn-sm mx-1 my-1"
            variant="dark"
            onClick={() => {
              setShowAssign(true);
              setSelectedKeeper(keeper);
            }}
            title="Assign care"
          >
            <FaHeartCirclePlus />
          </Button>
          <Button
            className="btn-sm mx-1 my-1"
            variant="dark"
            onClick={() => {
              setShowDischarge(true);
              setSelectedKeeper(keeper);
            }}
            title="Discharge care"
          >
            <FaHeartCircleMinus />
          </Button>
          <Button
            className="btn-sm mx-1 my-1"
            variant="info"
            onClick={() => {
              setUpdatedKeeper(keeper);
            }}
            title="Edit"
          >
            <FaPenToSquare />
          </Button>
          <Button
            className="btn-sm mx-1 my-1"
            variant="danger"
            onClick={() => deleteKeeper(keeper.keeperId)}
            title="Delete"
          >
            <FaTrashCan />
          </Button>
        </div>
      </td>
    </tr>
  );
}
