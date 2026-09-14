/**
 * 
 */
package no.hvl.dat152.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import no.hvl.dat152.model.User;
import no.hvl.dat152.service.Storage;


/**
 * @author tdoy
 */

@Controller
public class UserController {
	
	@Autowired Storage storage;
	
	@GetMapping("/adduser")
	public String register() {
		
		return "adduser";
	}
	
	@PostMapping("/adduser")
	public String register(@RequestParam String name,  
			@RequestParam String email, 
			@RequestParam String country, 
			@RequestParam MultipartFile photo, Model model) throws IOException {
		
		// create user object
		User user = new User(name, email, country, photo.getBytes());
		// write user to file or database (in-memory)	
		storage.addUser(user);
		
		model.addAttribute("user", user);
		
		// redirect to viewuser page
		return "viewuser";
	}
	
	@GetMapping("/viewusers")
	public String viewUsers(Model model) {
		
		model.addAttribute("users", storage.getUsers().values());
		
		return "viewusers";
	}
	
	@GetMapping("/viewuser")
	public String viewUser(@RequestParam String email, Model model) {
		
		User user = storage.getUser(email);
		model.addAttribute("user", user);
		
		return "viewuser";
	}

}
