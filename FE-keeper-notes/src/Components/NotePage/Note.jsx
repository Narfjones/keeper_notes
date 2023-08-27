import React from "react";
import { Button } from "react-bootstrap";
import { FaPenToSquare } from "react-icons/fa6";

export default function Note({
  note,
  keepers,
  animals,
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
        {!note.keeperId ? "former keeper" : findAuthor(note.keeperId, keepers)}
      </td>
      <td>{findSubject(note.animalId, animals)}</td>
      <td>
        {note.createdAt === note.updatedAt
          ? "N/A"
          : convertDate(note.updatedAt)}
      </td>
      <td>
        <Button
          className="btn-sm"
          variant="info"
          onClick={() => {
            setUpdatedNote(note);
          }}
          title="Edit"
        >
          <FaPenToSquare />
        </Button>
      </td>
    </tr>
  );
}
