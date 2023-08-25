package keeper.notes.controller.model;

import java.sql.Timestamp;
import java.util.Objects;

import keeper.notes.entity.Note;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NoteData {
	private Long noteId;
	private Timestamp createdAt;
	private String noteText;
	private Timestamp updatedAt;
	private Long keeperId;
	private Long animalId;
	
	public NoteData(Note note) {
		noteId = note.getNoteId();
		createdAt = note.getCreatedAt();
		noteText = note.getNoteText();
		updatedAt = note.getUpdatedAt();
		keeperId = (Objects.isNull(note.getKeeper()) ? null : note.getKeeper().getKeeperId());
		animalId = note.getAnimal().getAnimalId();	
		
	}
}
