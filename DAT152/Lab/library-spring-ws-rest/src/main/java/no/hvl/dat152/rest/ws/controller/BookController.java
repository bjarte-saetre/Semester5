package no.hvl.dat152.rest.ws.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import no.hvl.dat152.rest.ws.exceptions.BookNotFoundException;
import no.hvl.dat152.rest.ws.exceptions.UpdateBookFailedException;
import no.hvl.dat152.rest.ws.model.Book;
import no.hvl.dat152.rest.ws.service.BookService;

@RestController
@RequestMapping("/elibrary/api/v1")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/books")
    public ResponseEntity<Object> getAllBooks() {
        List<Book> books = bookService.findAll();
        if (books.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/books/{isbn}")
    public ResponseEntity<Book> getBook(@PathVariable String isbn)
            throws BookNotFoundException {
        return new ResponseEntity<>(bookService.findByISBN(isbn), HttpStatus.OK);
    }

    @PostMapping("/books")
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        return new ResponseEntity<>(bookService.saveBook(book), HttpStatus.CREATED);
    }

    @PutMapping("/books/{isbn}")
    public ResponseEntity<Book> updateBook(@PathVariable String isbn,
            @RequestBody Book book) throws UpdateBookFailedException {
        book.setIsbn(isbn);
        return new ResponseEntity<>(bookService.updateBook(book), HttpStatus.OK);
    }

    @DeleteMapping("/books/{isbn}")
    public ResponseEntity<Void> deleteBook(@PathVariable String isbn)
            throws BookNotFoundException {
        bookService.deleteByISBN(isbn);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
