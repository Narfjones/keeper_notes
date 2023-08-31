package keeper.notes.controller;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Objects;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import keeper.notes.KeeperNotesApplication;
import keeper.notes.controller.model.KeeperData;
import keeper.notes.controller.model.NoteData;

@SpringBootTest(webEnvironment = WebEnvironment.NONE, classes = KeeperNotesApplication.class )
@ActiveProfiles("test")
@Sql(scripts = {"classpath:schema.sql"})
class KeeperNotesControllerTest extends KeeperNotesTestSupport{
	
	@Test
	void testAddKeeper() {
		//Given: a keeper post request
		KeeperData request = buildInsertKeeper(1);
		KeeperData expected = buildInsertKeeper(1);
		
		//When: the keeper is added to the keeper table
		KeeperData actual = insertKeeper(request);
		
		//Then: the keeper returned is what we expected
		assertThat(actual).isEqualTo(expected);
		
		//And: there is one row in the keeper table.
		assertThat(rowsInKeeperTable()).isOne();
	}

	@Test
	void testGetKeeper() {
		//Given: a keeper
		KeeperData keeper = insertKeeper(buildInsertKeeper(1));
		KeeperData expected = buildInsertKeeper(1);
		
		//When: the keeper is retrieved by keeper ID
		KeeperData actual = getKeeper(keeper.getKeeperId());
		
		//Then: the actual keeper is equal to the expected keeper.
		assertThat(actual).isEqualTo(expected);
	}
	
	@Test
	void testGetAllKeepers() {
		//Given: two keepers
		List<KeeperData> expected = insertTwoKeepers();
		
		//When: all keepers are retrieved
		List<KeeperData> actual = getAllKeepers();
		
		//Then: the retrieved keepers are the same as expected.
		assertThat(actual).isEqualTo(expected);
	}

	@Test 
	void testUpdateKeeper(){
		//Given: a keeper in an update request
		insertKeeper(buildInsertKeeper (1));
		KeeperData expected = buildUpdateKeeper();
		
		//When: the keeper is updated
		KeeperData actual = updateKeeper(expected);
		
		//Then: the keeper is returned as expected
		assertThat(actual).isEqualTo(expected);
		
		//And: there is one row in the keeper table.
		assertThat(rowsInKeeperTable()).isOne();
	}
	
	@Test
	void testDeleteKeeperWithAssignedAnimals() {
		//Given: a keeper with 2 animals assigned to them
		KeeperData keeper = insertKeeper(buildInsertKeeper(1));
		Long keeperId = keeper.getKeeperId();
		
		insertAnimal(1);
		insertAnimal(2);
		
		assertThat(rowsInKeeperTable()).isOne();
		assertThat(rowsInAnimalTable()).isEqualTo(2);
		assertThat(rowsInAnimalKeeperTable()).isEqualTo(2);
		int animalRows = rowsInAnimalTable();
		
		//When: the keeper is deleted
		deleteKeeper(keeperId);
		
		//Then: there are no keeper or animal_keeper rows
		assertThat(rowsInKeeperTable()).isZero();
		assertThat(rowsInAnimalKeeperTable()).isZero();
		
		//And: the number of animal rows has not changed.
		assertThat(rowsInAnimalTable()).isEqualTo(animalRows);
	}
	
	@Test
	void testDeleteKeeperWithNote() {
		//Given: a keeper with 1 note about an animal
		KeeperData keeper = insertKeeper(buildInsertKeeper(1));
		Long keeperId = keeper.getKeeperId();
		insertAnimal(1);
		NoteData note = insertNote(buildInsertNote(1));		
		
		assertThat(rowsInKeeperTable()).isOne();
		assertThat(rowsInAnimalTable()).isOne();
		assertThat(rowsInNoteTable()).isOne();
		int animalRows = rowsInAnimalTable();
		int noteRows = rowsInNoteTable();
		
		//When: the keeper is deleted
		deleteKeeper(keeperId);
		
		//Then: there are no keeper rows
		assertThat(rowsInKeeperTable()).isZero();
		
		
		//And: the number of animal rows and note rows have not changed
		assertThat(rowsInAnimalTable()).isEqualTo(animalRows);
		assertThat(rowsInNoteTable()).isEqualTo(noteRows);
		
		//And: the keeperId for the note has been set to Null.
		assertThat(Objects.isNull(note.getKeeperId()));
	}

	

	
}
