package keeper.notes.controller.model;

import java.time.LocalDateTime;

import keeper.notes.entity.Note;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NoteData {
	private Long noteId;
	private LocalDateTime createdAt;
	private String noteText;
	private LocalDateTime updatedAt;
	private Long keeperId;
	private Long animalId;
	
	public NoteData(Note note) {
		noteId = note.getNoteId();
		createdAt = note.getCreatedAt();
		noteText = note.getNoteText();
		updatedAt = note.getUpdatedAt();
		keeperId = note.getKeeper().getKeeperId();
		animalId = note.getAnimal().getAnimalId();	
		
	}
}
