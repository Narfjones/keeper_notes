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


/*Using the @Entity notation tells Spring that this class will define a table in my database.*/
@Entity
@Data
public class Keeper {
	
	/*Using @Id and @GeneratedValue tells Spring that this entity variable will be the primary key for this table and 
	 * be automatically generated whenever for a new row when it is inserted into the table*/
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long keeperId;
	
	private String firstName;
	private String lastName;
	private Long radioNumber;
	
	
	/*Keeper has a one to many relationship with Note, but when a keeper is deleted the note should persist, the schema.sql file tells the Note
	 * table to set the keeper_id to NULL in a row when a keeper is deleted*/
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	@OneToMany(mappedBy = "keeper", cascade = CascadeType.PERSIST, orphanRemoval = false)//Don't want to delete a note if a keeper is removed.
	private Set<Note> notes = new HashSet<>();
	
	/*Keeper has a many to many relationship with Animal. Keeper is the owning table. The join table is the animal_keeper table
	 * and the join columns are keeper_id and animal_id*/
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	@ManyToMany(cascade = CascadeType.PERSIST)
	@JoinTable(name = "animal_keeper",
				joinColumns = @JoinColumn(name = "keeper_id"),
				inverseJoinColumns = @JoinColumn(name = "animal_id"))
	private Set<Animal> animals = new HashSet<>();
	
	
}
