package keeper.notes.controller.model;

import keeper.notes.entity.Note;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NoteData {
	private Long noteId;
	private String noteDate;
	private String noteText;
	private Long keeperId;
	private Long animalId;
	
	public NoteData(Note note) {
		noteId = note.getNoteId();
		noteDate = note.getNoteDate();
		noteText = note.getNoteText();
		keeperId = note.getKeeper().getKeeperId();
		animalId = note.getAnimal().getAnimalId();	
		
	}
}
