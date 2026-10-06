package no.hvl.dat152.rest.ws.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no.hvl.dat152.rest.ws.model.Author;
import no.hvl.dat152.rest.ws.repository.AuthorRepository;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    public List<Author> findAll() {
        return (List<Author>) authorRepository.findAll();
    }

    public Author findById(int id) {
        return authorRepository.findById(id).orElse(null);
    }

    public Author saveAuthor(Author author) {
        return authorRepository.save(author);
    }

    public Author updateAuthor(Author author) {
        Author existingAuthor = findById(author.getAuthorId());
        if (existingAuthor == null) {
            return null;
        }

        // Bokrelasjonene eies av Book og endres ikke når navnet oppdateres.
        existingAuthor.setFirstname(author.getFirstname());
        existingAuthor.setLastname(author.getLastname());
        return authorRepository.save(existingAuthor);
    }
}
