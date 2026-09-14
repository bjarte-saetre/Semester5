/**
 * 
 */
package no.hvl.dat152.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

import no.hvl.dat152.model.User;

/**
 * @author tdoy
 */
@Component
public class Storage {
	
	private Map<String, User> users;
	
	public Storage() {
		this.users = new HashMap<>();
	}
	
	public void addUser(User user) {
		users.put(user.getEmail(), user);
	}
	
	public Map<String, User> getUsers() {
		return users;
	}
	
	public User getUser(String email) {
		return users.get(email);
	}

}
