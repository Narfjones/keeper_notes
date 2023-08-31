package keeper.notes.entity;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/*Using the @Entity notation tells Spring that this class will define a table in my database.*/
@Entity
@Data
public class Note {
	
	/*Using @Id and @GeneratedValue tells Spring that this entity variable will be the primary key for this table and 
	 * be automatically generated whenever for a new row when it is inserted into the table*/
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long noteId;
	
	@CreationTimestamp
	private Timestamp createdAt;
	private String noteText;
	
	@UpdateTimestamp
	private Timestamp updatedAt;
	
	/*The Note table has a many to one relationship with the Keeper table, 
	 * but the note should persist even when the keeper is removed*/
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	@ManyToOne(cascade = CascadeType.PERSIST)//I don't want note to get deleted if a keeper is removed
	@JoinColumn(name = "keeper_id")
	private Keeper keeper;
	
	
	/*The Note table has a many to one relationship with the Animal Table
	* and the note should be deleted when an animal is deleted*/
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	@ManyToOne(cascade = CascadeType.ALL)//a note should be deleted if the animal it references is removed
	@JoinColumn(name = "animal_id")
	private Animal animal;
}
