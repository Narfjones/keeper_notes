import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AnimalPage from "./Components/AnimalPage/AnimalPage";
import KeeperPage from "./Components/KeeperPage/KeeperPage";
import NotePage from "./Components/NotePage/NotePage";
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import { useAppData } from "./useAppData";

function App() {
  const {
    keepers,
    setKeepers,
    animals,
    setAnimals,
    showError,
    setShowError,
    errorMessage,
    setErrorMessage,
    notes,
    setNotes,
    fetchAllKeepers,
    addNewKeeper,
    deleteKeeper,
    updateKeeper,
    assignAnimal,
    dischargeAnimal,
    fetchAllAnimals,
    addNewAnimal,
    deleteAnimal,
    updateAnimal,
    addNote,
    fetchAllNotes,
    updateNote,
  } = useAppData();

  React.useEffect(() => {
    fetchAllKeepers();
  }, []);

  React.useEffect(() => {
    fetchAllAnimals();
  }, []);

  React.useEffect(() => {
    fetchAllNotes();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/Keepers"
            element={
              <KeeperPage
                keepers={keepers}
                animals={animals}
                assignAnimal={assignAnimal}
                dischargeAnimal={dischargeAnimal}
                addNewKeeper={addNewKeeper}
                deleteKeeper={deleteKeeper}
                updateKeeper={updateKeeper}
                showError={showError}
                setShowError={setShowError}
                errorMessage={errorMessage}
              />
            }
          />
          <Route
            path="/Animals"
            element={
              <AnimalPage
                animals={animals}
                addNewAnimal={addNewAnimal}
                deleteAnimal={deleteAnimal}
                showError={showError}
                setShowError={setShowError}
                errorMessage={errorMessage}
                updateAnimal={updateAnimal}
              />
            }
          />
          <Route
            path="/Notes"
            element={
              <NotePage
                notes={notes}
                animals={animals}
                keepers={keepers}
                addNote={addNote}
                updateNote={updateNote}
                showError={showError}
                setShowError={setShowError}
                errorMessage={errorMessage}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
