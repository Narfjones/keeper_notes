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

@Entity
@Data
public class Note {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long noteId;
	
	@CreationTimestamp
	private Timestamp createdAt;
	private String noteText;
	
	@UpdateTimestamp
	private Timestamp updatedAt;
	
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	@ManyToOne(cascade = CascadeType.PERSIST)//I don't want note to get deleted if a keeper is removed
	@JoinColumn(name = "keeper_id")
	private Keeper keeper;
	
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	@ManyToOne(cascade = CascadeType.ALL)//a note should be deleted if the animal it references is removed
	@JoinColumn(name = "animal_id")
	private Animal animal;
}
