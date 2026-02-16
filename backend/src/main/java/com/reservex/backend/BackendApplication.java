package com.reservex.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}


// This is the main class for a Srping Boot application.
// Loading of all beans , loading of embedded Tomcat server and starting the application happens in this class.
// Exposes RESTAPI on port 8080 
