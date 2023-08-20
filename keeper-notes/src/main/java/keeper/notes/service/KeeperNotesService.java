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

	/* Keeper table methods */

	@Transactional(readOnly = false)
	public KeeperData saveKeeper(KeeperData keeperData) {
		Keeper keeper = findOrCreateKeeper(keeperData.getKeeperId());
		copyKeeperData(keeper, keeperData);

		Keeper dbKeeper = keeperDao.save(keeper);
		return new KeeperData(dbKeeper);
	}

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

	@Transactional(readOnly = true)
	public KeeperData retrieveKeeperById(Long keeperId) {
		Keeper keeper = findKeeperById(keeperId);
		return new KeeperData(keeper);
	}

	@Transactional(readOnly = false)
	public void deleteKeeperById(Long keeperId) {
		Keeper keeper = findKeeperById(keeperId);
		keeperDao.delete(keeper);

	}

	private void copyKeeperData(Keeper keeper, KeeperData keeperData) {
		keeper.setKeeperId(keeperData.getKeeperId());
		keeper.setFirstName(keeperData.getFirstName());
		keeper.setLastName(keeperData.getLastName());
		keeper.setRadioNumber(keeperData.getRadioNumber());

	}

	private Keeper findOrCreateKeeper(Long keeperId) {
		Keeper keeper;

		if (Objects.isNull(keeperId)) {
			keeper = new Keeper();
		} else {
			keeper = findKeeperById(keeperId);
		}

		return keeper;
	}

	private Keeper findKeeperById(Long keeperId) {
		return keeperDao.findById(keeperId)
				.orElseThrow(() -> new NoSuchElementException("Keeper with ID=" + keeperId + " does not exist."));
	}

	/* Animal Table Methods */

	@Transactional(readOnly = false)
	public AnimalData saveAnimal(AnimalData animalData) {
		Animal animal = findOrCreateAnimal(animalData.getAnimalId());
		copyAnimalData(animal, animalData);

		Animal dbAnimal = animalDao.save(animal);
		return new AnimalData(dbAnimal);
	}

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

	@Transactional(readOnly = true)
	public AnimalData retrieveAnimalById(Long animalId) {
		Animal animal = findAnimalById(animalId);
		return new AnimalData(animal);
	}

	@Transactional(readOnly = false)
	public void deleteAnimalById(Long animalId) {
		Animal animal = findAnimalById(animalId);
		animalDao.delete(animal);

	}

	private void copyAnimalData(Animal animal, AnimalData animalData) {
		animal.setAnimalId(animalData.getAnimalId());
		animal.setSpecies(animalData.getSpecies());
		animal.setCommonName(animalData.getCommonName());
		animal.setAnimalName(animalData.getAnimalName());
		animal.setLocation(animalData.getLocation());
	}

	private Animal findOrCreateAnimal(Long animalId) {
		Animal animal;

		if (Objects.isNull(animalId)) {
			animal = new Animal();
		} else {
			animal = findAnimalById(animalId);
		}
		return animal;
	}

	private Animal findAnimalById(Long animalId) {
		return animalDao.findById(animalId)
				.orElseThrow(() -> new NoSuchElementException("Animal with ID=" + animalId + " does not exist."));
	}

	/* Join Table methods */

	@Transactional(readOnly = false)
	public KeeperData assignAnimalToKeeper(Long keeperId, Long animalId) {
		Keeper keeper = findKeeperById(keeperId);
		Animal animal = findAnimalById(animalId);
		keeper.getAnimals().add(animal);
		animal.getKeepers().add(keeper);
		Keeper dbKeeper = keeperDao.save(keeper);
		animalDao.save(animal);

		return new KeeperData(dbKeeper);
	}
	
	@Transactional(readOnly = false)
	public KeeperData removeAnimalFromKeeper(Long keeperId, Long animalId) {
		Keeper keeper = findKeeperById(keeperId);
		Animal animal = findAnimalById(animalId);

		if (!keeper.getAnimals().contains(animal) || !animal.getKeepers().contains(keeper)) {
			throw new NoSuchElementException(
					"Animal with ID=" + animalId + " is not currently assigned to keeper with ID=" + keeperId);
		} else {
			keeper.getAnimals().remove(animal);
			animal.getKeepers().remove(keeper);
			Keeper dbKeeper = keeperDao.save(keeper);
			animalDao.save(animal);
			return new KeeperData(dbKeeper);
		}
		
	}

	/* Note Table methods */

	@Transactional(readOnly = false)
	public NoteData saveNote(Long keeperId, Long animalId, NoteData noteData) {
		Keeper keeper = findKeeperById(keeperId);
		Animal animal = findAnimalById(animalId);

		Note note = findOrCreateNote(noteData.getNoteId());

		note.setAnimal(animal);
		note.setKeeper(keeper);
		note.setNoteDate(noteData.getNoteDate());
		note.setNoteText(noteData.getNoteText());

		Note dbNote = noteDao.save(note);
		return new NoteData(dbNote);
	}

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

	@Transactional(readOnly = true)
	public NoteData retrieveNoteById(Long noteId) {
		Note note = findNoteById(noteId);
		return new NoteData(note);
	}

	private Note findOrCreateNote(Long noteId) {
		Note note;

		if (Objects.isNull(noteId)) {
			note = new Note();
		} else {
			note = findNoteById(noteId);
		}
		return note;
	}

	private Note findNoteById(Long noteId) {
		return noteDao.findById(noteId)
				.orElseThrow(() -> new NoSuchElementException("Note with ID=" + noteId + " does not exist."));
	}
	
	@Transactional(readOnly = true)
	public List<NoteData> listAllNotesByKeeper(Long keeperId) {
		findKeeperById(keeperId);
		List<Note> notes = noteDao.findAll();
		List<NoteData> keeperNotesList = new LinkedList<>();

		for (Note note : notes) {
			if(note.getKeeper().getKeeperId().equals(keeperId)) {
				NoteData temp = new NoteData(note);
				keeperNotesList.add(temp);				
			}
		}
		return keeperNotesList;
	}
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

}