import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Animals from "./pages/Animals";
import Keepers from "./pages/KeeperPage";
import Notes from "./pages/Notes";
import Home from "./pages/Home";
import Layout from "./Components/Layout";

function App() {
  const [keepers, setKeepers] = React.useState([]);
  const [animals, setAnimals] = React.useState([]);
  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const URL = "http://localhost:8080/keeper_notes";

  const fetchAllKeepers = async () => {
    try {
      const res = await fetch(`${URL}/keeper`);
      const data = await res.json();
      setKeepers(data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  React.useEffect(() => {
    fetchAllKeepers();
  }, []);

  const addNewKeeper = async (newKeeper) => {
    try {
      const response = await fetch(`${URL}/keeper`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newKeeper),
      });
      const newKeeperWithId = await response.json();
      setKeepers([...keepers, newKeeperWithId]);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const deleteKeeper = async (idToDelete) => {
    try {
      await fetch(`${URL}/keeper/${idToDelete}`, {
        method: "DELETE",
      });
      setKeepers(keepers.filter((keeper) => keeper.keeperId !== idToDelete));
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const updateKeeper = async (updatedKeeper) => {
    try {
      const response = await fetch(`${URL}/keeper/${updatedKeeper.keeperId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedKeeper),
      });
      const updated = await response.json();
      const updatedKeeperArray = keepers.map((keeper) => {
        return keeper.keeperId === updated.keeperId ? updated : keeper;
      });
      setKeepers(updatedKeeperArray);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const assignAnimal = async (keeperId, animalId) => {
    try {
      await fetch(`${URL}/assign/keeper${keeperId}/animal${animalId}`, {
        method: "PUT",
      });
      fetchAllKeepers();
      fetchAllAnimals();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const dischargeAnimal = async (keeperId, animalId) => {
    try {
      await fetch(`${URL}/remove/keeper${keeperId}/animal${animalId}`, {
        method: "PUT",
      });
      fetchAllKeepers();
      fetchAllAnimals();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const fetchAllAnimals = async () => {
    try {
      const res = await fetch(`${URL}/animal`);
      const data = await res.json();
      setAnimals(data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  React.useEffect(() => {
    fetchAllAnimals();
  }, []);

  const addNewAnimal = async (newAnimal) => {
    try {
      const response = await fetch(`${URL}/animal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAnimal),
      });
      const newAnimalWithId = await response.json();
      setAnimals([...animals, newAnimalWithId]);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const deleteAnimal = async (idToDelete) => {
    try {
      await fetch(`${URL}/animal/${idToDelete}`, {
        method: "DELETE",
      });
      setAnimals(animals.filter((animal) => animal.animalId !== idToDelete));
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/Keepers"
            element={
              <Keepers
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
              <Animals
                animals={animals}
                addNewAnimal={addNewAnimal}
                deleteAnimal={deleteAnimal}
                showError={showError}
                setShowError={setShowError}
                errorMessage={errorMessage}
              />
            }
          />
          <Route path="/Notes" element={<Notes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
