package keeper.notes.controller.model;

import java.util.HashSet;
import java.util.Set;

import keeper.notes.entity.Animal;
import keeper.notes.entity.Keeper;
import keeper.notes.entity.Note;
import lombok.Data;
import lombok.NoArgsConstructor;


/*This class sets up a data transfer object for the Keeper entity*/
@Data
@NoArgsConstructor
public class KeeperData {
	private Long keeperId;	
	private String firstName;
	private String lastName;
	private Long radioNumber;
	private Set<NoteData> notes = new HashSet<>();
	private Set<String> animals = new HashSet<>();
	
	
	/*This constructor creates a KeeperData object based off of a Keeper object*/
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
	
	/*This constructor was set up to use with integration testing*/
	public KeeperData(Long keeperId, String firstName, String lastName, Long radioNumber) {
		this.keeperId = keeperId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.radioNumber = radioNumber;
	}
	
	
	/*This method was set up to use with integration testing so that a KeeperData object could be changed to a Keeper object*/
	public Keeper toKeeper() {
		Keeper keeper = new Keeper();
		
		keeper.setKeeperId(keeperId);
		keeper.setFirstName(firstName);
		keeper.setLastName(lastName);
		keeper.setRadioNumber(radioNumber);
		
		for(NoteData noteData : notes) {
			keeper.getNotes().add(noteData.toNote());
		}
		return keeper;
	}
}
