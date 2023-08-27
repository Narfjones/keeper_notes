import React from "react";
import AddNoteForm from "./AddNoteForm";
import NoteTable from "./NoteTable";
import UpdateNoteForm from "./UpdateNoteForm";

export default function NotePage({
  notes,
  animals,
  keepers,
  addNote,
  updateNote,
  showError,
  setShowError,
  errorMessage,
}) {
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [updatedNote, setUpdatedNote] = React.useState(null);
  const [showFormAlert, setShowFormAlert] = React.useState(false);
  //console.log("keepers", keepers);

  const findAuthor = (id, keeperArray) => {
    //console.log({ id });
    //console.log(keeperArray);
    const author = keeperArray.filter((keeper) => keeper.keeperId === id);
    //console.log(author);
    return author[0].firstName + " " + author[0].lastName;
  };

  const findSubject = (id, animalArray) => {
    const subject = animalArray.filter((animal) => animal.animalId === id);
    //console.log(subject);
    return subject[0].animalName;
  };

  return (
    <div className="mx-3">
      <h1 className="text-center m-3 text-white">Notes</h1>
      <AddNoteForm
        addNote={addNote}
        animals={animals}
        keepers={keepers}
        showError={showError}
        setShowError={setShowError}
        errorMessage={errorMessage}
        showFormAlert={showFormAlert}
        setShowFormAlert={setShowFormAlert}
      />
      <NoteTable
        animals={animals}
        keepers={keepers}
        notes={notes}
        findSubject={findSubject}
        findAuthor={findAuthor}
        updateNote={updateNote}
        setShowUpdate={setShowUpdate}
        setUpdatedNote={setUpdatedNote}
      />
      {updatedNote && (
        <UpdateNoteForm
          animals={animals}
          keepers={keepers}
          findAuthor={findAuthor}
          findSubject={findSubject}
          updatedNote={updatedNote}
          setUpdatedNote={setUpdatedNote}
          setShowFormAlert={setShowFormAlert}
          updateNote={updateNote}
        />
      )}
    </div>
  );
}
