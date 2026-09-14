package no.hvl.dat152.action;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import no.hvl.dat152.action.ControllerAction;

import java.io.IOException;

public class AddAuthorFormAction implements ControllerAction {
    @Override
    public int execute(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        return ControllerAction.SUCCESS;
    }
}