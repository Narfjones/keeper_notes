import React from "react";
import { Table } from "react-bootstrap";

export default function Keepers() {
  const [keepers, setKeepers] = React.useState([]);

  const URL = "http://localhost:8080/keeper_notes";

  const fetchKeepers = async () => {
    const res = await fetch(`${URL}/keeper`);
    const data = await res.json();
    setKeepers(data);
  };

  React.useEffect(() => {
    fetchKeepers();
  }, []);

  return (
    <div>
      <h1>Keepers</h1>
      <Table>
        <thead>
          <tr>
            <th>Keeper Name</th>
            <th>Radio Number</th>
          </tr>
        </thead>
        <tbody>
          {keepers.map((keeper) => (
            <tr key={keeper.keeperId}>
              <td>{keeper.firstName + " " + keeper.lastName}</td>
              <td>{keeper.radioNumber}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
