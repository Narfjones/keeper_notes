package keeper.notes.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import keeper.notes.entity.Animal;

public interface AnimalDao extends JpaRepository<Animal, Long> {

}
