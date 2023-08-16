package keeper.notes.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import keeper.notes.entity.Note;

public interface NoteDao extends JpaRepository<Note, Long> {

}
