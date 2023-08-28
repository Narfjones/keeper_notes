package keeper.notes.controller.model;

import java.util.HashSet;
import java.util.Set;

import keeper.notes.entity.Animal;
import keeper.notes.entity.Keeper;
import keeper.notes.entity.Note;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class KeeperData {
	private Long keeperId;	
	private String firstName;
	private String lastName;
	private Long radioNumber;
	private Set<NoteData> notes = new HashSet<>();
	private Set<String> animals = new HashSet<>();
	
	public KeeperData(Keeper keeper) {
		keeperId = keeper.getKeeperId();
		firstName = keeper.getFirstName();
		lastName = keeper.getLastName();
		radioNumber = keeper.getRadioNumber();
		
		for(Note note: keeper.getNotes()) {
			notes.add(new NoteData(note));
		}
		
		for(Animal animal: keeper.getAnimals()) {
			animals.add(animal.getAnimalName() + ": " + animal.getCommonName() + ", " + animal.getLocation());
		}
	}
}
