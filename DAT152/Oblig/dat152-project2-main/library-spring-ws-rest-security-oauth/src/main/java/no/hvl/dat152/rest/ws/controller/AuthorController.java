package no.hvl.dat152.rest.ws.controller;

import java.util.List;
import no.hvl.dat152.rest.ws.model.Book;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import no.hvl.dat152.rest.ws.exceptions.AuthorNotFoundException;
import no.hvl.dat152.rest.ws.model.Author;
import no.hvl.dat152.rest.ws.service.AuthorService;

@RestController
@RequestMapping("/elibrary/api/v1")
public class AuthorController {

    // TODO Task 3: add endpoint access rules with @PreAuthorize.

    @Autowired
    private AuthorService authorService;

    @GetMapping("/authors")
    public ResponseEntity<Object> getAllAuthor() {
        List<Author> authors = authorService.findAll();
        if (authors.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @GetMapping("/authors/{id}")
    public ResponseEntity<Author> getAuthor(@PathVariable int id)
            throws AuthorNotFoundException {
        return new ResponseEntity<>(authorService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/authors/{id}/books")
    public ResponseEntity<Set<Book>> getBooksByAuthorId(@PathVariable int id)
            throws AuthorNotFoundException {
        Set<Book> books = authorService.findBooksByAuthorId(id);
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @PostMapping("/authors")
    public ResponseEntity<Author> createAuthor(@RequestBody Author author) {
        author.setAuthorId(0);
        return new ResponseEntity<>(authorService.saveAuthor(author), HttpStatus.CREATED);
    }

    @PutMapping("/authors/{id}")
    public ResponseEntity<Author> updateAuthor(@PathVariable int id,
            @RequestBody Author author) throws AuthorNotFoundException {
        return new ResponseEntity<>(authorService.updateAuthor(author, id), HttpStatus.OK);
    }
}
