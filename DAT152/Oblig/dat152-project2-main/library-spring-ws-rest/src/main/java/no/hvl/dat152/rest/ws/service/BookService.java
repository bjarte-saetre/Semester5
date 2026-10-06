package no.hvl.dat152.rest.ws.service;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import no.hvl.dat152.rest.ws.exceptions.BookNotFoundException;
import no.hvl.dat152.rest.ws.exceptions.UpdateBookFailedException;
import no.hvl.dat152.rest.ws.model.Author;
import no.hvl.dat152.rest.ws.model.Book;
import no.hvl.dat152.rest.ws.repository.BookRepository;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    public List<Book> findAll() {
        return (List<Book>) bookRepository.findAll();
    }

    public Book findByISBN(String isbn) throws BookNotFoundException {
        return bookRepository.findByIsbn(isbn)
                .orElseThrow(() -> new BookNotFoundException(
                        "Book with isbn = " + isbn + " not found!"));
    }

    public Book updateBook(Book book, String isbn) throws UpdateBookFailedException {
        Book existingBook = bookRepository.findByIsbn(isbn)
                .orElseThrow(() -> new UpdateBookFailedException(
                        "Book with isbn = " + isbn + " could not be updated!"));
        existingBook.setTitle(book.getTitle());
        existingBook.setAuthors(book.getAuthors());
        return bookRepository.save(existingBook);
    }

    // TODO public List<Book> findAllPaginate(Pageable page)

    @Transactional(readOnly = true)
    public Set<Author> findAuthorsOfBookByISBN(String isbn) throws BookNotFoundException {
        Book book = findByISBN(isbn);
        return new HashSet<>(book.getAuthors());
    }

    // TODO public void deleteById(long id)

    public void deleteByISBN(String isbn) throws BookNotFoundException {
        Book book = findByISBN(isbn);
        bookRepository.delete(book);
    }
}
