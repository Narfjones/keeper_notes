package keeper.notes.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import keeper.notes.controller.model.AnimalData;
import keeper.notes.controller.model.KeeperData;
import keeper.notes.controller.model.NoteData;
import keeper.notes.service.KeeperNotesService;
import lombok.extern.slf4j.Slf4j;

/*The @RestController annotation tells Spring that this is where all the RESTful requests will come and based off of the 
 * mapping defined in each method, based off the method body, it will route the call to the appropriate place in the service class*/
@RestController
@RequestMapping("/keeper_notes") /*All requests to this API must come to this address*/
@CrossOrigin(origins = "http://localhost:5173") /*This is the annotation I found to allow a cross origin request from my front end app*/
@Slf4j
public class KeeperNotesController {

	@Autowired
	KeeperNotesService keeperNotesService;
	
	
	/**************************All mapping for Keeper entity**************************/
	
	/*Adding a keeper calls the saveKeeper method in the service layer*/
	@PostMapping("/keeper")
	@ResponseStatus(code = HttpStatus.CREATED)
	public KeeperData addKeeper(@RequestBody KeeperData keeperData) {
		log.info("Adding keeper {}", keeperData);
		return keeperNotesService.saveKeeper(keeperData);
	}
	
	/*Getting a list of all keepers calls the retrieveAllKeepers method in the service layer*/
	@GetMapping("/keeper")
	@ResponseStatus(code = HttpStatus.OK)
	public List<KeeperData> listAllKeepers(){
		log.info("Listing all keepers");
		return keeperNotesService.retrieveAllKeepers();
	}
	
	/*Retrieving  a keeper by their ID calls the retrieveKeeperById method in the service layer*/
	@GetMapping("/keeper/{keeperId}")
	@ResponseStatus(code = HttpStatus.OK)
	public KeeperData retrieveKeeperById(@PathVariable Long keeperId) {
		log.info("Retrieving info for keeper with ID= {}", keeperId);
		return keeperNotesService.retrieveKeeperById(keeperId);
	}
	
	/*Updating a keeper calls the saveKeeper method in the service layer but uses a PUT call instead of a POST*/
	@PutMapping("/keeper/{keeperId}")
	@ResponseStatus(code = HttpStatus.OK)
	public KeeperData updateKeeperInfo(@PathVariable Long keeperId, @RequestBody KeeperData keeperData) {
		log.info("Updating keeper with ID= {}", keeperId);
		keeperData.setKeeperId(keeperId);
		return keeperNotesService.saveKeeper(keeperData);
	}
	
	
	/*Deleting a keeper calls the deleteKeeperById method in the service layer*/
	@DeleteMapping("/keeper/{keeperId}")
	@ResponseStatus(code = HttpStatus.OK)
	public Map<String, String> deleteKeeperById(@PathVariable Long keeperId){
		log.info("Removing keeper with ID= {}", keeperId);
		keeperNotesService.deleteKeeperById(keeperId);
		return Map.of("message", "Successfully removed keeper with ID=" + keeperId);
	}
	
	
	/**************************End mapping for Keeper entity**************************/
	
	
	/**************************All mapping for Keeper and Animal entities together, 
	 * these create rows in the animal_keeper join table**************************/
	
	
	/*Assigning an animal to a keeper uses a PUT call and then calls the assignAnimalToKeeper method in the service layer*/
	@PutMapping("/assign/keeper{keeperId}/animal{animalId}")
	@ResponseStatus(code = HttpStatus.OK)
	public KeeperData assignAnimalToKeeper(@PathVariable Long keeperId,@PathVariable Long animalId) {
		log.info("Assigning animal with ID= {} to keeper with ID= {}", animalId, keeperId);
		return keeperNotesService.assignAnimalToKeeper(keeperId, animalId);
	}
	
	/*Removing an animal from a keepers care also uses a POST call, but then calls the removeAnimalFromKeeper method in the service layer*/
	@PutMapping("/remove/keeper{keeperId}/animal{animalId}")
	@ResponseStatus(code = HttpStatus.OK)
	public KeeperData removeAnimalFromKeeper(@PathVariable Long keeperId,@PathVariable Long animalId) {
		log.info("Discharging animal with ID= {} from keeper with ID= {}", animalId, keeperId);
		return keeperNotesService.removeAnimalFromKeeper(keeperId, animalId);
	}
	
	/**************************End mapping for Animal and Keeper entities together**************************/
	
	
	/**************************All mapping for Animal entity**************************/
	
	/*Adding an animal calls the addAnimal method in the service layer*/
	@PostMapping("/animal")
	@ResponseStatus(code = HttpStatus.CREATED)
	public AnimalData addAnimal(@RequestBody AnimalData animalData) {
		log.info("Adding animal {}", animalData);
		return keeperNotesService.saveAnimal(animalData);
	}
	
	/*Getting all animals calls the listAllAnimals method in the service layer*/
	@GetMapping("/animal")
	@ResponseStatus(code = HttpStatus.OK)
	public List<AnimalData> listAllAnimals(){
		log.info("Listing all animals");
		return keeperNotesService.retrieveAllAnimals();
	}
	
	/*Getting an animal by ID calls the retrieveAnimalById method in the service layer*/
	@GetMapping("/animal/{animalId}")
	@ResponseStatus(code = HttpStatus.OK)
	public AnimalData retrieveAnimalById(@PathVariable Long animalId) {
		log.info("Retrieving info for animal with ID= {}", animalId);
		return keeperNotesService.retrieveAnimalById(animalId);
	}
	
	/*This method gets a list of all animals assigned to a specific keeper and calls the listAllAnimalsAssignedToKeeper 
	 * method in the service layer*/
	@GetMapping("/animal/keeper{keeperId}")
	@ResponseStatus(code = HttpStatus.OK)
	public List<AnimalData> listAllAnimalsAssignedToKeeper(@PathVariable Long keeperId){
		log.info("Retrieving all animals assigned to keeper with ID={}", keeperId);
		return keeperNotesService.listAllAnimalsAssignedToKeeper(keeperId);
	}
	
	/*Updating an animal calls the saveAnimal method in the service layer but uses a PUT request instead of POST so it updates the 
	 * animal with the specified animalId instead of creating a new one*/
	@PutMapping("/animal/{animalId}")
	@ResponseStatus(code = HttpStatus.OK)
	public AnimalData updateAnimalInfo(@PathVariable Long animalId, @RequestBody AnimalData animalData) {
		log.info("Updating animal with ID= {}", animalId);
		animalData.setAnimalId(animalId);
		return keeperNotesService.saveAnimal(animalData);
	}
	
	
	/*Deleting an animal calls the deleteAnimalById method in the service layer*/
	@DeleteMapping("/animal/{animalId}")
	@ResponseStatus(code = HttpStatus.OK)
	public Map<String, String> deleteAnimalById(@PathVariable Long animalId){
		log.info("Removing animal with ID+ {}", animalId);
		keeperNotesService.deleteAnimalById(animalId);
		return Map.of("message", "Successfully removed animal with ID=" + animalId);
	}
	
	/**************************End mapping for Animal entity**************************/
	
	
	
	/**************************All mapping for Note entity**************************/
	
	/*Adding a note calls the createNote method in the service layer*/
	@PostMapping("/note/keeper{keeperId}/animal{animalId}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public NoteData createNote(@PathVariable Long keeperId, @PathVariable Long animalId, @RequestBody NoteData noteData) {
		log.info("Creating note {} from keeper {}, about animal {}", noteData, keeperId, animalId);
		return keeperNotesService.saveNote(keeperId, animalId, noteData);
	}
	
	/*Listing out all notes calls the listAllNotes method in the service layer*/
	@GetMapping()
	@ResponseStatus(code = HttpStatus.OK)
	public List<NoteData> listAllNotes(){
		log.info("Retrieving all notes");
		return keeperNotesService.retrieveAllNotes();
	}
	
	/*Retrieving a note by ID calls the retrieveNoteById method in the service layer*/
	@GetMapping("/{noteId}")
	@ResponseStatus(code = HttpStatus.OK)
	public NoteData retrieveNoteById(@PathVariable Long noteId) {
		log.info("Retrieving note with ID=", noteId);
		return keeperNotesService.retrieveNoteById(noteId);
	}
	
	/*Retrieving all notes by a specific keeper ID calls the listAllNotesByKeeper method in the service layer*/
	@GetMapping("/note/keeper{keeperId}")
	@ResponseStatus(code = HttpStatus.OK)
	public List<NoteData> listAllNotesByKeeper(@PathVariable Long keeperId){
		log.info("Retrieving all notes by keeper with ID_=", keeperId);
		return keeperNotesService.listAllNotesByKeeper(keeperId);
	}
	
	/*Retrieving all notes about a specific animal calls the listAllNotesAboutAnimal method in the service layer*/
	@GetMapping("/note/animal{animalId}")
	@ResponseStatus(code = HttpStatus.OK)
	public List<NoteData> listAllNotesAboutAnimal(@PathVariable Long animalId){
		log.info("Retrieving all notes about animal with ID_=", animalId);
		return keeperNotesService.listAllNotesAboutAnimal(animalId);
	}
	
	/*Updating a note calls the updateNote method in the service layer*/
	@PutMapping("/note/keeper{keeperId}/animal{animalId}/note{noteId}")
	@ResponseStatus(code = HttpStatus.OK)
	public NoteData updateNote(@PathVariable Long keeperId, @PathVariable Long animalId, @PathVariable Long noteId, @RequestBody NoteData noteData) {
		log.info("Updating note {} from keeper {}, about animal {}", noteData, keeperId, animalId);
		noteData.setNoteId(noteId);
		return keeperNotesService.saveNote(keeperId, animalId, noteData);
	}
	
	/**************************End mapping for Note entity**************************/

}
