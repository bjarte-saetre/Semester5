/**
 * 
 */
package no.hvl.dat152.rest.ws.controller;


import no.hvl.dat152.rest.ws.model.Author;
import no.hvl.dat152.rest.ws.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 
 */
@RestController
@RequestMapping("/elibrary/api/v1")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

	@GetMapping("/elibrary/api/v1/authors")
    public ResponseEntity<Author> getAllAuthors() {
        List<Author> authors = authorService.findAll();

        if (authors.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @GetMapping("/elibrary/api/v1/authors/{id}")
    public ResponseEntity<Author> getAuthor(@PathVariable Integer id) {
        Author author = authorService.findById(id);

        if (author == null) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return new ResponseEntity<>(author, HttpStatus.OK);
    }

    @PostMapping("/elibrary/api/v1/authors")
    public ResponseEntity<Author> createAuthor(@RequestBody Author author) {

        Author nauthor = authorService.saveAuthor(author);

        return new ResponseEntity<>(nauthor, HttpStatus.CREATED);

    }

    @PutMapping("/elibrary/api/v1/authors/{id}")
    public ResponseEntity<Author> updateAuthor(@PathVariable Integer id, @RequestBody Author author) {
        author.setAuthorId(id);
        Author updatedAuthor = authorService.updateAuthor(author);

        return new ResponseEntity<>(updatedAuthor, HttpStatus.OK);
    }

}
