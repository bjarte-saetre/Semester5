package no.hvl.dat152.action;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import no.hvl.dat152.dao.BookDAO;

import java.io.IOException;

public class DeleteBookAction implements ControllerAction {

    @Override
    public int execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        BookDAO bookDAO = new BookDAO();
        String isbn = request.getParameter("isbn");
        bookDAO.deleteBook(isbn);
        request.setAttribute("books", bookDAO.getAllBooks());
        return ControllerAction.SUCCESS;

    }

}
