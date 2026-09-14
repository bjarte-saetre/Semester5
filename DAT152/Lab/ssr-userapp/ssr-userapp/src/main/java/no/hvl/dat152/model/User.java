/**
 * 
 */
package no.hvl.dat152.model;

import no.hvl.dat152.service.UserFile;

/**
 * @author tdoy
 */
public class User {
	
	private String name;
	private String email;
	private String country;
	private byte[] photo;
	private String photoUrl;
	
	public User(String name, String email, String country, byte[] photo) {
		this.name = name;
		this.email = email;
		this.country = country;
		this.photo = photo;
		savePhoto();
	}
	
	public String getName() {
		return name;
	}
	
	public String getEmail() {
		return email;
	}
	
	public String getCountry() {
		return country;
	}
	
	public byte[] getPhoto() {
		return photo;
	}
	
	public String getPhotoUrl() {
		return photoUrl;
	}
	
	private void savePhoto() {
		UserFile userFile = new UserFile(this);
		photoUrl = userFile.addPhoto();
	}

}
