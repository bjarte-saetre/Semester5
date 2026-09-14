/**
 * 
 */
package no.hvl.dat152.service;

import java.awt.image.BufferedImage;
import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.springframework.util.ResourceUtils;

import no.hvl.dat152.model.User;

/**
 * @author tdoy
 */
public class UserFile {
	
	private String filepath = "static/db/users.txt";
	private User user;
	
	public UserFile(User user) {
		
		this.user = user;
		try {
			File file = ResourceUtils.getFile("classpath:" + filepath);
			filepath = file.getAbsolutePath();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	/**
	 * Not used in this implementation. Users are stored in memory.
	 */
	public void addUser() {

		// write user to file or database
		try (BufferedWriter writer = new BufferedWriter(new FileWriter(filepath, true))) {
			writer.write(user.getName() + "," + user.getEmail() + "," + user.getCountry());
			writer.newLine();
		} catch (IOException e) {
			e.printStackTrace();
		}
		// 
		addPhoto();
	}
	
	public String addPhoto() {
		
		String dirPath = new File(filepath).getParent() + "/";
		System.out.println("Directory path: " + dirPath);
		
		UUID uuid = UUID.randomUUID();
		String uniqueFileID = uuid.toString();
		
		File imgfile = new File(dirPath + uniqueFileID + ".jpeg");

		
		String imgDir = "db/"+imgfile.getName();
		if(user.getPhoto().length == 0) {
			imgDir = "db/noimage.jpeg";
		} else {
			ByteArrayInputStream bis = new ByteArrayInputStream(user.getPhoto());
			try {
				BufferedImage image = ImageIO.read(bis);
				ImageIO.write(image, "jpeg", imgfile);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
		return imgDir;
		
	}

}
