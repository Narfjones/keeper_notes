package keeper.notes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KeeperNotesApplication {

	public static void main(String[] args) {
// Because we are using Spring this is how we tell Spring to start up the application
		SpringApplication.run(KeeperNotesApplication.class, args);
		
	}

}
