/**
 * 
 */
package no.hvl.dat152.rest.ws.controller;

import java.util.List;

import no.hvl.dat152.rest.ws.exceptions.UpdateBookFailedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import no.hvl.dat152.rest.ws.exceptions.BookNotFoundException;
import no.hvl.dat152.rest.ws.model.Book;
import no.hvl.dat152.rest.ws.service.BookService;

/**
 * 
 */
@RestController
@RequestMapping("/elibrary/api/v1")
public class BookController {

	@Autowired
	private BookService bookService;
	
	@GetMapping("/books")
	public ResponseEntity<Object> getAllBooks(){
		
		List<Book> books = bookService.findAll();
		
		if(books.isEmpty())
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		
		return new ResponseEntity<>(books, HttpStatus.OK);		
	}
	
	@GetMapping("/books/{isbn}")
	public ResponseEntity<Book> getBook(@PathVariable String isbn) throws BookNotFoundException {
		
		Book book = bookService.findByISBN(isbn);
		
		if(book == null)
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		else
			return new ResponseEntity<>(book, HttpStatus.OK);		
	}
	
	@PostMapping("/books")
	public ResponseEntity<Book> createBook(@RequestBody Book book){
		
		Book nbook = bookService.saveBook(book);
		
		return new ResponseEntity<>(nbook, HttpStatus.CREATED);
	}

    @PutMapping("/books/{isbn}")
    public ResponseEntity<Book> updateBook(@PathVariable String isbn, @RequestBody Book book) throws UpdateBookFailedException {
        book.setIsbn(isbn);
        Book updatedBook = bookService.updateBook(book);

        return new ResponseEntity<>(updatedBook, HttpStatus.OK);
    }

    @DeleteMapping("/books/{isbn}")
    public ResponseEntity<Book> deleteBook(@PathVariable String isbn) throws BookNotFoundException {
        bookService.deleteByISBN(isbn);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
