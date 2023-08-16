package keeper.notes.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Data
public class Keeper {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int keeperId;
	
	private String firstName;
	private String lastName;
	private int radioNumber;
	
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	@OneToMany(mappedBy = "keeper", cascade = CascadeType.PERSIST, orphanRemoval = false)//Should this be ALL? Don't want to delete a note if a keeper is removed.
	private Set<Note> notes = new HashSet<>();
	
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	@ManyToMany(cascade = CascadeType.PERSIST)
	@JoinTable(name = "animal_keeper",
				joinColumns = @JoinColumn(name = "keeper_id"),
				inverseJoinColumns = @JoinColumn(name = "animal_id"))
	private Set<Animal> animals = new HashSet<>();
	
	
}
