import React from "react";
import Keeper from "./Keeper";
import { Table } from "react-bootstrap";

export default function KeeperTable({
  keepers,
  deleteKeeper,
  setShowAssign,
  setShowDischarge,
  setSelectedKeeper,
  setUpdatedKeeper,
}) {
  return (
    <div className="keeperTable bg-light m-3 p-3 table-responsive">
      <h3>Registered Keepers</h3>
      {keepers.length === 0 && <h4>***There are no keepers registered***</h4>}
      <Table className="text-center  table-hover ">
        <thead>
          <tr>
            <th>Keeper Name</th>
            <th>Radio Number</th>
            <th>Assigned animals</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {keepers.map((keeper) => (
            <Keeper
              key={keeper.keeperId}
              keeper={keeper}
              deleteKeeper={deleteKeeper}
              setShowAssign={setShowAssign}
              setShowDischarge={setShowDischarge}
              setSelectedKeeper={setSelectedKeeper}
              setUpdatedKeeper={setUpdatedKeeper}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}
