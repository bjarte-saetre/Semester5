package no.hvl.userapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;


@SpringBootApplication
@ComponentScan(basePackages = {"no.hvl.userapp", "no.hvl.dat152.controllers", 
		"no.hvl.dat152.model", "no.hvl.dat152.service"})
@Configuration
public class UserAppApplication {

	
	public static void main(String[] args) {
		SpringApplication.run(UserAppApplication.class, args);
	}

}
