import React from "react";
import AddKeeperForm from "./AddKeeperForm";
import UpdateKeeperForm from "./UpdateKeeperForm";
import KeeperTable from "./KeeperTable";
import AssignCare from "./AssignCare";
import DischargeCare from "./DischargeCare";

export default function KeeperPage({
  keepers,
  animals,
  assignAnimal,
  dischargeAnimal,
  addNewKeeper,
  deleteKeeper,
  updateKeeper,
  showError,
  setShowError,
  errorMessage,
}) {
  const [selectedKeeper, setSelectedKeeper] = React.useState(null);
  const [showAssign, setShowAssign] = React.useState(false);
  const [showDischarge, setShowDischarge] = React.useState(false);
  const [updatedKeeper, setUpdatedKeeper] = React.useState(null);
  const [showFormAlert, setShowFormAlert] = React.useState(false);

  return (
    <div className="mx-3">
      <h1 className="text-center m-3 text-white">Keepers</h1>
      <AddKeeperForm
        addNewKeeper={addNewKeeper}
        showError={showError}
        setShowError={setShowError}
        errorMessage={errorMessage}
        showFormAlert={showFormAlert}
        setShowFormAlert={setShowFormAlert}
      />
      <KeeperTable
        keepers={keepers}
        deleteKeeper={deleteKeeper}
        setShowAssign={setShowAssign}
        setShowDischarge={setShowDischarge}
        setSelectedKeeper={setSelectedKeeper}
        setUpdatedKeeper={setUpdatedKeeper}
      />
      {showAssign && (
        <AssignCare
          assignAnimal={assignAnimal}
          setShowAssign={setShowAssign}
          animals={animals}
          selectedKeeper={selectedKeeper}
          setSelectedKeeper={setSelectedKeeper}
        />
      )}
      {showDischarge && (
        <DischargeCare
          dischargeAnimal={dischargeAnimal}
          setShowDischarge={setShowDischarge}
          animals={animals}
          selectedKeeper={selectedKeeper}
          setSelectedKeeper={setSelectedKeeper}
        />
      )}
      {updatedKeeper && (
        <UpdateKeeperForm
          updatedKeeper={updatedKeeper}
          setUpdatedKeeper={setUpdatedKeeper}
          updateKeeper={updateKeeper}
          setShowFormAlert={setShowFormAlert}
        />
      )}
    </div>
  );
}
