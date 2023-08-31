package keeper.notes.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.jdbc.JdbcTestUtils;

import keeper.notes.controller.model.KeeperData;
import keeper.notes.controller.model.NoteData;
import keeper.notes.entity.Animal;
import keeper.notes.entity.Keeper;
import keeper.notes.entity.Note;

public class KeeperNotesTestSupport {
	private static final String NOTE_TABLE = "note";

	private static final String ANIMAL_TABLE = "animal";

	private static final String ANIMAL_KEEPER_TABLE = "animal_keeper";

	private static final String KEEPER_TABLE = "keeper";

	private static final String INSERT_ANIMAL_1_SQL = """
			INSERT INTO animal
			(species, common_name, animal_name, location)
			VALUES('Crocuta crocuta', 'Spotted hyena', 'Ralphy', 'African carnivores')
			""";

	private static final String INSERT_ANIMAL_2_SQL = """
			INSERT INTO animal
			(species, common_name, animal_name, location)
			VALUES('Ursus arctus', 'Brown bear', 'Mitch', 'NA bear')
			""";

	private static final String INSERT_ANIMAL_KEEPER_SQL_1 = """
			INSERT INTO animal_keeper
			(keeper_id, animal_id)
			VALUES(1, 1);
			""";
	
	private static final String INSERT_ANIMAL_KEEPER_SQL_2 = """
			INSERT INTO animal_keeper
			(keeper_id, animal_id)
			VALUES(1, 2);
			""";

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private KeeperNotesController keeperNotesController;
	
	protected int rowsInNoteTable() {
		return JdbcTestUtils.countRowsInTable(jdbcTemplate, NOTE_TABLE);
	}

	protected NoteData insertNote(NoteData noteData) {
		Note note = noteData.toNote();
		NoteData clone = new NoteData(note);
		Long animalId = clone.getAnimalId();
		Long keeperId = clone.getKeeperId();
		
		clone.setNoteId(null);
		return keeperNotesController.createNote(keeperId, animalId, clone);
	}

	protected NoteData buildInsertNote(int which) {
		return which == 1 ? insertNote1 : insertNote2;
	}
	
	protected int rowsInKeeperTable() {
		return JdbcTestUtils.countRowsInTable(jdbcTemplate, KEEPER_TABLE);
	}

	protected KeeperData insertKeeper(KeeperData keeperData) {
		Keeper keeper = keeperData.toKeeper();
		KeeperData clone = new KeeperData(keeper);
		
		clone.setKeeperId(null);
		return keeperNotesController.addKeeper(clone);
	}

	protected KeeperData buildInsertKeeper(int which) {
		return which == 1 ? insertKeeper1 : insertKeeper2;
	}
	
	//@formatter:off
	private KeeperData insertKeeper1 = new KeeperData(
			1L,
			"Rachel",
			"VanHorn",
			922L
			);
	
	private KeeperData insertKeeper2 = new KeeperData(
			2L,
			"Beth",
			"Klochak",
			912L
			);
	
	private KeeperData updateKeeper1 = new KeeperData(
			1L,
			"Tim",
			"Samson",
			913L
			);
	
	private NoteData insertNote1 = new NoteData(
			1L,
			"ate all of his dinner",
			1L,
			1L
			);
	
	private NoteData insertNote2 = new NoteData(
			2L,
			"ate no dinner",
			1L,
			1L
			);
	//@formatter:on
	
	protected KeeperData getKeeper(Long keeperId) {
		return keeperNotesController.retrieveKeeperById(keeperId);
	}
	
	protected List<KeeperData> getAllKeepers() {
		return keeperNotesController.listAllKeepers();
	}

	protected List<KeeperData> insertTwoKeepers() {
		KeeperData keeper1 = insertKeeper(buildInsertKeeper(1));
		KeeperData keeper2 = insertKeeper(buildInsertKeeper(2));
		
		return List.of(keeper1, keeper2);
	}
	
	protected KeeperData updateKeeper(KeeperData keeperData) {
		return keeperNotesController.updateKeeperInfo(keeperData.getKeeperId(), keeperData);
	}

	protected KeeperData buildUpdateKeeper() {
		return updateKeeper1;
	}

	protected void deleteKeeper(Long keeperId) {
		keeperNotesController.deleteKeeperById(keeperId);
		
	}

	protected int rowsInAnimalKeeperTable() {
		return JdbcTestUtils.countRowsInTable(jdbcTemplate, ANIMAL_KEEPER_TABLE);
	}

	protected int rowsInAnimalTable() {
		return JdbcTestUtils.countRowsInTable(jdbcTemplate, ANIMAL_TABLE);
	}

	protected void insertAnimal(int which) {
		String animalSql = which == 1 ? INSERT_ANIMAL_1_SQL : INSERT_ANIMAL_2_SQL;
		String animalKeeperSql = which == 1 ? INSERT_ANIMAL_KEEPER_SQL_1: INSERT_ANIMAL_KEEPER_SQL_2;
		
		jdbcTemplate.update(animalSql);
		jdbcTemplate.update(animalKeeperSql);
	}

	
	
}
