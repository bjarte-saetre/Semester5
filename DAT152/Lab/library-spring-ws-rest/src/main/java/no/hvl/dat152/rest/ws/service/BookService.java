/**
 * 
 */
package no.hvl.dat152.rest.ws.service;

import java.util.List;

import no.hvl.dat152.rest.ws.exceptions.UpdateBookFailedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import no.hvl.dat152.rest.ws.exceptions.BookNotFoundException;
import no.hvl.dat152.rest.ws.model.Book;
import no.hvl.dat152.rest.ws.repository.BookRepository;

/**
 * 
 */
@Service
public class BookService {

	@Autowired
	private BookRepository bookRepository;
	
	
	public Book saveBook(Book book) {
		
		return bookRepository.save(book);
		
	}
	
	public List<Book> findAll(){
		
		return (List<Book>) bookRepository.findAll();
		
	}
	
	public Book findByISBN(String isbn) throws BookNotFoundException {
		
		Book book = null;
		try {
			book = bookRepository.findBookByISBN(isbn);
		}catch(Exception e) {
			throw new BookNotFoundException("Book with isbn = "+isbn+" not found!");
		}
		
		if (book == null)
			throw new BookNotFoundException("Book with isbn = "+isbn+" not found!");
		else
			return book;
	}

    public Book updateBook(Book book) throws UpdateBookFailedException {
        Book existingBook = bookRepository.findBookByISBN(book.getIsbn());
        if (existingBook == null) {
            throw new UpdateBookFailedException("Book with isbn = " + book.getIsbn() + "could not be updated!");
        }
        existingBook.setTitle(book.getTitle());
        existingBook.setAuthors(book.getAuthors());

        return bookRepository.save(existingBook);
    }

    public void deleteByISBN(String isbn) {

        Book existingBook = bookRepository.findBookByISBN(isbn);
        bookRepository.delete(existingBook);

    }

}
