import React from "react";
import { Table } from "react-bootstrap";

export default function Keepers() {
  const [keepers, setKeepers] = React.useState([]);

  const URL = "http://localhost:8080/keeper_notes";

  const fetchAllKeepers = async () => {
    const res = await fetch(`${URL}/keeper`);
    const data = await res.json();
    setKeepers(data);
  };

  React.useEffect(() => {
    fetchAllKeepers();
  }, []);

  return (
    <div>
      <h1 className="text-center">Keepers</h1>
      <Table className="text-center">
        <thead>
          <tr>
            <th>Keeper Name</th>
            <th>Radio Number</th>
            <th>Assigned animals</th>
          </tr>
        </thead>
        <tbody>
          {keepers.map((keeper) => (
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
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
