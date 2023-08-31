package keeper.notes.controller.model;

import java.sql.Timestamp;
import java.util.Objects;

import keeper.notes.entity.Animal;
import keeper.notes.entity.Keeper;
import keeper.notes.entity.Note;
import lombok.Data;
import lombok.NoArgsConstructor;


/*This class sets up a data transfer object for the Note entity*/
@Data
@NoArgsConstructor
public class NoteData {
	private Long noteId;
	private Timestamp createdAt;
	private String noteText;
	private Timestamp updatedAt;
	private Long keeperId;
	private Long animalId;
	
	/*This constructor creates a NoteData object based off of a Note object*/
	public NoteData(Note note) {
		noteId = note.getNoteId();
		createdAt = note.getCreatedAt();
		noteText = note.getNoteText();
		updatedAt = note.getUpdatedAt();
		keeperId = (Objects.isNull(note.getKeeper()) ? null : note.getKeeper().getKeeperId());
		animalId = note.getAnimal().getAnimalId();	
		
	}
	
	/*This constructor was set up to use with integration testing*/
	public NoteData(Long noteId, String noteText, Long keeperId, Long animalId) {
		this.noteId = noteId;
		this.noteText = noteText;
		this.keeperId = keeperId;
		this.animalId = animalId;
		this.createdAt = new Timestamp(System.currentTimeMillis());
		this.updatedAt = new Timestamp(System.currentTimeMillis());
	}

	/*This method was set up to use with integration testing so that a NoteData object could be changed to a Note object*/
	public Note toNote() {
		Note note = new Note();
		Animal animal = new Animal();
		Keeper keeper = new Keeper();
		animal.setAnimalId(animalId);
		keeper.setKeeperId(keeperId);
		
		note.setNoteId(noteId);
		note.setCreatedAt(createdAt);
		note.setNoteText(noteText);
		note.setUpdatedAt(updatedAt);
		note.setAnimal(animal);
		note.setKeeper(keeper);
		
		return note;
	}

}
