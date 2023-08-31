package keeper.notes.controller.model;

import java.util.HashSet;
import java.util.Set;

import keeper.notes.entity.Animal;
import keeper.notes.entity.Keeper;
import keeper.notes.entity.Note;
import lombok.Data;
import lombok.NoArgsConstructor;


/*This class sets up a data transfer object for the Animal entity*/
@Data
@NoArgsConstructor
public class AnimalData {
	private Long animalId;	
	private String species;
	private String commonName;
	private String animalName;
	private String location;
	private Set<NoteData> notes = new HashSet<>();
	private Set<String> keepers = new HashSet<>();
	
	
	/*This constructor creates an AnimalData object based off of an Animal object*/
	public AnimalData(Animal animal) {
		animalId = animal.getAnimalId();
		species = animal.getSpecies();
		commonName = animal.getCommonName();
		animalName = animal.getAnimalName();
		location = animal.getLocation();
		
		for(Note note: animal.getNotes()) {
			notes.add(new NoteData(note));
		}
		
		for(Keeper keeper: animal.getKeepers()) {
			keepers.add(keeper.getFirstName() +" "+ keeper.getLastName());
		}
	}
}
