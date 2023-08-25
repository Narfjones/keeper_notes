import React from "react";
import { Button } from "react-bootstrap";

export default function Note({
  note,
  keepers,
  animals,
  setShowUpdate,
  findAuthor,
  findSubject,
  setUpdatedNote,
}) {
  const convertDate = (timestamp) => {
    const date = new Date(timestamp);
    const localDate = date.toLocaleDateString();
    const localTime = date.toLocaleTimeString();
    return `${localDate} - ${localTime}`;
  };

  return (
    <tr>
      <td>{convertDate(note.createdAt)}</td>
      <td>{note.noteText}</td>
      <td>
        {note.keeperId === null
          ? "former keeper"
          : findAuthor(note.keeperId, keepers)}
      </td>
      <td>{findSubject(note.animalId, animals)}</td>
      <td>
        {note.createdAt === note.updatedAt
          ? "N/A"
          : convertDate(note.updatedAt)}
      </td>
      <td>
        <Button
          variant="info"
          onClick={() => {
            setShowUpdate(true);
            setUpdatedNote(note);
          }}
        >
          Update
        </Button>
      </td>
    </tr>
  );
}
