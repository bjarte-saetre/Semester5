package no.hvl.dat152.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import no.hvl.dat152.action.*;
import no.hvl.dat152.dao.AuthorDAO;
import no.hvl.dat152.dao.BookDAO;
import no.hvl.dat152.model.Author;
import no.hvl.dat152.model.Book;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;


/**
 * Servlet implementation class FrontController
 * @author tdoy
 */
public class FrontController extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	private Map<String, ControllerAction> actions;
	private FlowManager flowManager;
	
	@Override
    public void init() throws ServletException {
		createActionsMap();
		flowManager = new FlowManager();
	}
	
	private void createActionsMap() {
		
		actions = new HashMap<>();
		
		actions.put("addbookform", new AddBookFormAction());
		actions.put("addbook", new AddBookAction());
		actions.put("updatebookform", new UpdateBookFormAction());
		actions.put("updatebook", new UpdateBookAction());
		actions.put("viewbook", new ViewBookAction());
		actions.put("viewbooks", new ViewBooksAction());
		
		// new features
		actions.put("addauthorform", new AddAuthorFormAction());
		actions.put("addauthor", new AddAuthorAction());
		actions.put("deletebookconfirm", new ViewBookAction());
		actions.put("deletebook", new DeleteBookAction());
	}
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String cmd = request.getPathInfo();
        if(cmd == null)
        	cmd = "";
        else {
        	cmd = cmd.substring(1);
        }
        System.out.println("cmd = "+cmd);
        
        final ControllerAction action = actions.get(cmd);
        int success = action.execute(request, response);
        
        if(success == ControllerAction.SUCCESS) {
        	String page = flowManager.getPage(cmd);
        	request.getRequestDispatcher(page).forward(request, response);
        } else {
        	request.getRequestDispatcher(request.getContextPath()).forward(request, response);
        }
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doGet(request, response);
	}

}
