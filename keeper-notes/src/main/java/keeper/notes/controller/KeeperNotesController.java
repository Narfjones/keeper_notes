package keeper.notes.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import keeper.notes.service.KeeperNotesService;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/keeper_notes")
@Slf4j
public class KeeperNotesController {

	@Autowired
	KeeperNotesService keeperNotesService;
	
	/*All mapping for Keeper entity*/
	
	@PostMapping("/keeper")
	@ResponseStatus(code = HttpStatus.CREATED)
	public KeeperData addKeeper(@RequestBody KeeperData keeperData) {
		log.info("Adding keeper {}", keeperData);
		return keeperNotesService.saveKeeper(keeperData);
	}
	
	@GetMapping("/keeper")
	@ResponseStatus(code = HttpStatus.OK)
	public List<KeeperData> listAllKeepers(){
		log.info("Listing all keepers");
		return keeperNotesService.retrieveAllKeepers();
	}
	
	@GetMapping("/keeper/{keeperId}")
	@ResponseStatus(code = HttpStatus.OK)
	public KeeperData retrieveKeeperById(@PathVariable Long keeperId) {
		log.info("Retrieving info for keeper with ID= {}", keeperId);
		return keeperNotesService.retrieveKeeperById(keeperId);
	}
	
	
	@PutMapping("/keeper/{keeperId}")
	@ResponseStatus(code = HttpStatus.OK)
	public KeeperData updateKeeperInfo(@PathVariable Long keeperId, @RequestBody KeeperData keeperData) {
		log.info("Updating keeper with ID= {}", keeperId);
		keeperData.setKeeperId(keeperId);
		return keeperNotesService.saveKeeper(keeperData);
	}
	
	
	@DeleteMapping("/keeper/{keeperId}")
	@ResponseStatus(code = HttpStatus.OK)
	public Map<String, String> deleteKeeperById(@PathVariable Long keeperId){
		log.info("Removing keeper with ID+ {}", keeperId);
		keeperNotesService.deleteKeeperById(keeperId);
		return Map.of("message", "Successfully removed keeper with ID=" + keeperId);
	}
	
	@PutMapping("/keeper/{keeperId}/animal/{animalId}")
	@ResponseStatus(code = HttpStatus.OK)
	public KeeperData assignAnimalToKeeper(@PathVariable Long keeperId,@PathVariable Long animalId) {
		log.info("Assigning animal with ID= {} to keeper with ID= {}", animalId, keeperId);
		return keeperNotesService.assignAnimalToKeeper(keeperId, animalId);
	}
	
	
	/*All mapping for Animal entity*/
	
	@PostMapping("/animal")
	@ResponseStatus(code = HttpStatus.CREATED)
	public AnimalData addAnimal(@RequestBody AnimalData animalData) {
		log.info("Adding animal {}", animalData);
		return keeperNotesService.saveAnimal(animalData);
	}
	
	@GetMapping("/animal")
	@ResponseStatus(code = HttpStatus.OK)
	public List<AnimalData> listAllAnimals(){
		log.info("Listing all animals");
		return keeperNotesService.retrieveAllAnimals();
	}
	
	@GetMapping("/animal/{animalId}")
	@ResponseStatus(code = HttpStatus.OK)
	public AnimalData retrieveAnimalById(@PathVariable Long animalId) {
		log.info("Retrieving info for animal with ID= {}", animalId);
		return keeperNotesService.retrieveAnimalById(animalId);
	}
	
	@PutMapping("/animal/{animalId}")
	@ResponseStatus(code = HttpStatus.OK)
	public AnimalData updateAnimalInfo(@PathVariable Long animalId, @RequestBody AnimalData animalData) {
		log.info("Updating keeper with ID= {}", animalId);
		animalData.setAnimalId(animalId);
		return keeperNotesService.saveAnimal(animalData);
	}
	

	@DeleteMapping("/animal/{animalId}")
	@ResponseStatus(code = HttpStatus.OK)
	public Map<String, String> deleteAnimalById(@PathVariable Long animalId){
		log.info("Removing animal with ID+ {}", animalId);
		keeperNotesService.deleteAnimalById(animalId);
		return Map.of("message", "Successfully removed animal with ID=" + animalId);
	}
}
