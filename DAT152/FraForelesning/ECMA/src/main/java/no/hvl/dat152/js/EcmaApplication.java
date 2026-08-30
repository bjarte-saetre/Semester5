package no.hvl.dat152.js;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.server.servlet.context.ServletComponentScan;

@ServletComponentScan
@SpringBootApplication
public class EcmaApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcmaApplication.class, args);
	}

}
