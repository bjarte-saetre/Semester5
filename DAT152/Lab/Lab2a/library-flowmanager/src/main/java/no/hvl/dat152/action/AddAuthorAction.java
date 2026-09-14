package no.hvl.dat152.action;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import no.hvl.dat152.dao.AuthorDAO;
import no.hvl.dat152.dao.BookDAO;
import no.hvl.dat152.model.Author;

import java.io.IOException;

public class AddAuthorAction implements ControllerAction {

    @Override
    public int execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String firstname = request.getParameter("firstname");
        String lastname = request.getParameter("lastname");

        Author author = new Author(firstname, lastname);

        // save in DB
        AuthorDAO dao = new AuthorDAO();
        dao.addAuthor(author);

        BookDAO bookDAO = new BookDAO();
        request.setAttribute("books", bookDAO.getAllBooks());

//		response.sendRedirect("viewbooks");
        return ControllerAction.SUCCESS;

    }
}
