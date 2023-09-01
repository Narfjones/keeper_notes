package keeper.notes.service;

import java.util.LinkedList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import keeper.notes.controller.model.AnimalData;
import keeper.notes.controller.model.KeeperData;
import keeper.notes.controller.model.NoteData;
import keeper.notes.dao.AnimalDao;
import keeper.notes.dao.KeeperDao;
import keeper.notes.dao.NoteDao;
import keeper.notes.entity.Animal;
import keeper.notes.entity.Keeper;
import keeper.notes.entity.Note;

@Service
public class KeeperNotesService {

	@Autowired
	private KeeperDao keeperDao;

	@Autowired
	private AnimalDao animalDao;

	@Autowired
	private NoteDao noteDao;

	/*********** Keeper table methods ***********/

	/*This method saves a keeper, it is used by the POST method to create
	 * a new keeper and also by the PUT method to update a keeper. It calls several helper methods*/
	@Transactional(readOnly = false)
	public KeeperData saveKeeper(KeeperData keeperData) {
		Keeper keeper = findOrCreateKeeper(keeperData.getKeeperId());
		copyKeeperData(keeper, keeperData);

		Keeper dbKeeper = keeperDao.save(keeper);
		return new KeeperData(dbKeeper);
	}

	/*This method returns a list of KeeperData as JSON. It uses the built in method from the KeeperDao interface
	 * that finds all rows or instances of a keeper in the table. It then changes the data from a Keeper object to a 
	 * KeeperData object and adds them to a List of KeeperData*/
	@Transactional(readOnly = true)
	public List<KeeperData> retrieveAllKeepers() {
		List<Keeper> keepers = keeperDao.findAll();
		List<KeeperData> kdList = new LinkedList<>();

		for (Keeper keeper : keepers) {
			KeeperData temp = new KeeperData(keeper);
			kdList.add(temp);
		}
		return kdList;
	}

	/*This method uses the helper method findKeeperById to retrieve a keeper by the ID in the path variable*/
	@Transactional(readOnly = true)
	public KeeperData retrieveKeeperById(Long keeperId) {
		Keeper keeper = findKeeperById(keeperId);
		return new KeeperData(keeper);
	}

	/*This method uses the findKeeperById helper method and then uses the KeeperDao interface built in delete method
	 * to remove the appropriate row from the Keeper table. Nothing is returned from this method, but the
	 * controller layer does log a confirmation that the keeper was deleted when this runs with no exceptions.*/
	@Transactional(readOnly = false)
	public void deleteKeeperById(Long keeperId) {
		Keeper keeper = findKeeperById(keeperId);
		keeperDao.delete(keeper);

	}

	/*Helper method that copies keeper info from a KeeperData object to a Keeper object*/
	private void copyKeeperData(Keeper keeper, KeeperData keeperData) {
		keeper.setKeeperId(keeperData.getKeeperId());
		keeper.setFirstName(keeperData.getFirstName());
		keeper.setLastName(keeperData.getLastName());
		keeper.setRadioNumber(keeperData.getRadioNumber());

	}

	/*Helper method that finds a keeper by ID or if no ID is found, creates a new Keeper object*/
	private Keeper findOrCreateKeeper(Long keeperId) {
		Keeper keeper;

		if (Objects.isNull(keeperId)) {
			keeper = new Keeper();
		} else {
			keeper = findKeeperById(keeperId);
		}

		return keeper;
	}

	/*Helper method that finds a keeper by their ID, since it could return an optional from the DAO, we follow up the 
	 * call to the KeeperDao with an orElseThrow declaration that would provide an exception if the keeper ID being searched
	 * for does not exist.*/
	private Keeper findKeeperById(Long keeperId) {
		return keeperDao.findById(keeperId)
				.orElseThrow(() -> new NoSuchElementException("Keeper with ID=" + keeperId + " does not exist."));
	}

	/*********** End Keeper table methods ***********/
	
	
	/*********** Animal table methods ***********/

	/*This method saves an animal, it is used by the POST method to create
	 * a new animal and also by the PUT method to update an animal. It calls several helper methods*/
	@Transactional(readOnly = false)
	public AnimalData saveAnimal(AnimalData animalData) {
		Animal animal = findOrCreateAnimal(animalData.getAnimalId());
		copyAnimalData(animal, animalData);

		Animal dbAnimal = animalDao.save(animal);
		return new AnimalData(dbAnimal);
	}

	/*This method returns a list of AnimalData as JSON. It uses the built in method from the AnimalDao interface
	 * that finds all rows or instances of an animal in the table. It then changes the data from an Animal object to an 
	 * AnimalData object and adds them to a List of AnimalData*/
	@Transactional(readOnly = true)
	public List<AnimalData> retrieveAllAnimals() {
		List<Animal> animals = animalDao.findAll();
		List<AnimalData> adList = new LinkedList<>();

		for (Animal animal : animals) {
			AnimalData temp = new AnimalData(animal);
			adList.add(temp);
		}
		return adList;
	}

	/*This method uses the helper method findAnimalById to retrieve an animal by the ID in the path variable*/
	@Transactional(readOnly = true)
	public AnimalData retrieveAnimalById(Long animalId) {
		Animal animal = findAnimalById(animalId);
		return new AnimalData(animal);
	}

	/*This method uses the findAnimalById helper method and then uses the AnimalDao interface's built in delete method
	 * to remove the appropriate row from the Animal table. Nothing is returned from this method, but the
	 * controller layer does log a confirmation that the animal was deleted when this runs with no exceptions.*/
	@Transactional(readOnly = false)
	public void deleteAnimalById(Long animalId) {
		Animal animal = findAnimalById(animalId);
		animalDao.delete(animal);

	}
	
	
	/*Helper method that copies animal info from an AnimalData object to an Animal object*/
	private void copyAnimalData(Animal animal, AnimalData animalData) {
		animal.setAnimalId(animalData.getAnimalId());
		animal.setSpecies(animalData.getSpecies());
		animal.setCommonName(animalData.getCommonName());
		animal.setAnimalName(animalData.getAnimalName());
		animal.setLocation(animalData.getLocation());
	}
	
	/*Helper method that finds an animal by ID or if no ID is found, creates a new Animal object*/
	private Animal findOrCreateAnimal(Long animalId) {
		Animal animal;

		if (Objects.isNull(animalId)) {
			animal = new Animal();
		} else {
			animal = findAnimalById(animalId);
		}
		return animal;
	}

	/*Helper method that finds an animal by their ID, since it could return an optional from the DAO, we follow up the 
	 * call to the AnimalDao with an orElseThrow declaration that would provide an exception if the animal ID being searched
	 * for does not exist.*/
	private Animal findAnimalById(Long animalId) {
		return animalDao.findById(animalId)
				.orElseThrow(() -> new NoSuchElementException("Animal with ID=" + animalId + " does not exist."));
	}
	
	/*********** End Animal table methods ***********/

	
	
	/*********** Join (animal_keeper) table methods ***********/
	
	/*This method creates a row in the animal_keeper join table, connecting an animal with a keeper. It first finds
	 * both the keeper and animal by the IDs in the path variables and checks to see if they exist in the findByID methods for
	 * both animal and keeper. It then checks to make sure the animal is not already assigned to the keeper and if it is,
	 * throws an illegal argument exception saying that the animal is already assigned to that keeper. If they are not already
	 * associated in the join table, then the animal is added to the keeper's list of animals and the keeper is added to the
	 * animal's list of keepers and both are saved using the built in DAO save method.*/
	@Transactional(readOnly = false)
	public KeeperData assignAnimalToKeeper(Long keeperId, Long animalId) {
		Keeper keeper = findKeeperById(keeperId);
		Animal animal = findAnimalById(animalId);
		
		if(keeper.getAnimals().contains(animal) || animal.getKeepers().contains(keeper)) {
			throw new IllegalArgumentException(
					"Animal with ID=" + animalId + " is already assigned to keeper with ID=" + keeperId);			
		} else {
			keeper.getAnimals().add(animal);
			animal.getKeepers().add(keeper);
			Keeper dbKeeper = keeperDao.save(keeper);
			animalDao.save(animal);	
			return new KeeperData(dbKeeper);
		}

		
	}
	
	/*This method deletes a row in the animal_keeper join table, disconnecting an animal from a keeper. It first finds
	 * both the keeper and animal by the IDs in the path variables and checks to see if they exist in the findByID methods for
	 * both animal and keeper. It then checks to make sure the animal is assigned to the keeper and if it is not,
	 * throws an illegal argument exception saying that the animal is not assigned to that keeper. If they are
	 * associated in the join table, then the animal is removed from the keeper's list of animals and the keeper is removed from the
	 * animal's list of keepers and both are saved using the built in DAO save method.*/
	@Transactional(readOnly = false)
	public KeeperData removeAnimalFromKeeper(Long keeperId, Long animalId) {
		Keeper keeper = findKeeperById(keeperId);
		Animal animal = findAnimalById(animalId);

		if (!keeper.getAnimals().contains(animal) || !animal.getKeepers().contains(keeper)) {
			throw new IllegalArgumentException(
					"Animal with ID=" + animalId + " is not currently assigned to keeper with ID=" + keeperId);
		} else {
			keeper.getAnimals().remove(animal);
			animal.getKeepers().remove(keeper);
			Keeper dbKeeper = keeperDao.save(keeper);
			animalDao.save(animal);
			return new KeeperData(dbKeeper);
		}
		
	}
	
	/*This method returns a list of AnimalData containing only animals assigned to the keeper specified in the path variable
	 * of the GET request. It uses the findKeeperById helper method and the AnimalDao build in method to create a list of all the animals, 
	 * then uses a nested enhanced for loop to loop through all of the animals and check to see if they are assigned to the keeper with the ID 
	 * specified. If the animal is associated with the keeper ID on the animal_keeper join table, then it is added to a new List and once
	 * the loop is completed, that list is returned as a List of AnimalData objects.*/
	@Transactional(readOnly = true)
	public List<AnimalData> listAllAnimalsAssignedToKeeper(Long keeperId) {
		findKeeperById(keeperId);
		List<Animal> animals = animalDao.findAll();
		List<AnimalData> animalList = new LinkedList<>();
		
		for (Animal animal : animals) {
			for(Keeper keeper : animal.getKeepers()) {
				if(keeper.getKeeperId().equals(keeperId)) {
					AnimalData temp = new AnimalData(animal);
					animalList.add(temp);
				}
			}
		}
		return animalList;
		
	}
	
	/*********** End Join table methods ***********/

	
	
	/*********** Note table methods ***********/

	/*This method saves a note, it is used by the POST method to create
	 * a new note and also by the PUT method to update a note. It calls the findOrCreateNote helper method*/
	@Transactional(readOnly = false)
	public NoteData saveNote(Long keeperId, Long animalId, NoteData noteData) {
		Keeper keeper = findKeeperById(keeperId);
		Animal animal = findAnimalById(animalId);

		Note note = findOrCreateNote(noteData.getNoteId());

		note.setAnimal(animal);
		note.setKeeper(keeper);
		note.setNoteText(noteData.getNoteText());

		Note dbNote = noteDao.save(note);
		return new NoteData(dbNote);
	}

	/*This method returns a list of NoteData as JSON. It uses the built in method from the NoteDao interface
	 * that finds all rows or instances of a note in the table. It then changes the data from a Note object to a
	 * NoteData object and adds them to a List of NoteData*/
	@Transactional(readOnly = true)
	public List<NoteData> retrieveAllNotes() {
		List<Note> notes = noteDao.findAll();
		List<NoteData> ndList = new LinkedList<>();

		for (Note note : notes) {
			NoteData temp = new NoteData(note);
			ndList.add(temp);
		}
		return ndList;
	}

	/*This method finds a specific note by the id passed in a path variable. It uses the findNoteById helper method to
	 * search for the note with the specific ID.*/
	@Transactional(readOnly = true)
	public NoteData retrieveNoteById(Long noteId) {
		Note note = findNoteById(noteId);
		return new NoteData(note);
	}

	/*Helper method that finds a note by ID or if no ID is found, creates a new Note object*/
	private Note findOrCreateNote(Long noteId) {
		Note note;

		if (Objects.isNull(noteId)) {
			note = new Note();
		} else {
			note = findNoteById(noteId);
		}
		return note;
	}

	/*Helper method that finds a note by its ID, since it could return an optional from the DAO, we follow up the 
	 * call to the NoteDao with an orElseThrow declaration that would provide an exception if the note ID being searched
	 * for does not exist.*/
	private Note findNoteById(Long noteId) {
		return noteDao.findById(noteId)
				.orElseThrow(() -> new NoSuchElementException("Note with ID=" + noteId + " does not exist."));
	}
	
	/*This method returns a list of NoteData containing only notes created by the keeper specified in the path variable
	 * of the GET request. It uses the findKeeperById helper method and the NoteDao's built in method to create a list of all the notes, 
	 * then uses a nested enhanced for loop to loop through all of the notes and check to see if they have the ID of the specified keeper 
	 * as a foreign key. If the note was created by the keeper with that ID, then it is added to a new List and once
	 * the loop is completed, that list is returned as a List of NoteData objects.*/
	@Transactional(readOnly = true)
	public List<NoteData> listAllNotesByKeeper(Long keeperId) {
		findKeeperById(keeperId);
		List<Note> notes = noteDao.findAll();
		List<NoteData> keeperNotesList = new LinkedList<>();

		for (Note note : notes) {
			if(!Objects.isNull(note.getKeeper())) {
				if(note.getKeeper().getKeeperId().equals(keeperId)) {
					NoteData temp = new NoteData(note);
					keeperNotesList.add(temp);				
				}				
			}
		}
		return keeperNotesList;
	}
	
	/*This method returns a list of NoteData containing only notes created about the animal specified in the path variable
	 * of the GET request. It uses the findAnimalById helper method and the NoteDao's built in method to create a list of all the notes, 
	 * then uses a nested enhanced for loop to loop through all of the notes and check to see if they have the animal_id of the specified animal 
	 * as a foreign key. If the note was created about the specified animal, then it is added to a new List and once
	 * the loop is completed, that list is returned as a List of NoteData objects.*/
	@Transactional(readOnly = true)
	public List<NoteData> listAllNotesAboutAnimal(Long animalId) {
		findAnimalById(animalId);
		List<Note> notes = noteDao.findAll();
		List<NoteData> animalNotesList = new LinkedList<>();
		
		for (Note note : notes) {
			if(note.getAnimal().getAnimalId().equals(animalId)) {
				NoteData temp = new NoteData(note);
				animalNotesList.add(temp);				
			}
		}
		return animalNotesList;
	}

	/*********** End Note table methods ***********/
	
}