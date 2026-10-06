/**
 * 
 */
package no.hvl.dat152.rest.ws.service;


import no.hvl.dat152.rest.ws.exceptions.UpdateBookFailedException;
import no.hvl.dat152.rest.ws.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no.hvl.dat152.rest.ws.model.Author;
import no.hvl.dat152.rest.ws.repository.AuthorRepository;

import java.util.List;

/**
 * 
 */
@Service
public class AuthorService {

	@Autowired
	private AuthorRepository authorRepository;
	
	public Author findById(int id) {
		
		return authorRepository.findById(id).get();
	}

    public Author saveAuthor(Author author) {
        return authorRepository.save(author);
    }

    public Author updateAuthor(Author author) {
        Author existingAuthor = authorRepository.findById(author.getAuthorId()).orElse(null);
        if (existingAuthor == null) {
            return null;
        }
        existingAuthor.setFirstname(author.getFirstname());
        existingAuthor.setLastname(author.getLastname());

        return authorRepository.save(existingAuthor);
    }

    public List<Author> findAll() {
        return (List<Author>) authorRepository.findAll();
    }

}
