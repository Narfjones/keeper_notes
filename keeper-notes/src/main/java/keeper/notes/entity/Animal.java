package keeper.notes.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;


/*Using the @Entity notation tells Spring that this class will define a table in my database.*/
@Entity
@Data
public class Animal {
	
	/*Using @Id and @GeneratedValue tells Spring that this entity variable will be the primary key for this table and 
	 * be automatically generated whenever for a new row when it is inserted into the table*/
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long animalId;
	
	private String species;
	private String commonName;
	private String animalName;
	private String location;
	
	/*Animal has a one to many relationship with Note and if an animal is deleted then the related notes should be removed as well*/
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	@OneToMany(mappedBy = "animal", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Note> notes = new HashSet<>();
	
	
	/*Animal has a many to many relationship with Keeper. Animal is the owned side of the relationship*/
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	@ManyToMany(mappedBy = "animals", cascade = CascadeType.PERSIST)
	private Set<Keeper> keepers = new HashSet<>();
	
	
}
