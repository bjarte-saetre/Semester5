package no.hvl.dat152.rest.ws.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class LibraryExceptionHandler {

    @ExceptionHandler(BookNotFoundException.class)
    public ResponseEntity<String> bookNotFound(BookNotFoundException ex) {
        return new ResponseEntity<>("An error occurred: " + ex.getMessage(),
                HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UpdateBookFailedException.class)
    public ResponseEntity<String> updateBookFailed(UpdateBookFailedException ex) {
        return new ResponseEntity<>("An error occurred: " + ex.getMessage(),
                HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> otherErrors(Exception ex) {
        return new ResponseEntity<>("An error occurred: " + ex.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
