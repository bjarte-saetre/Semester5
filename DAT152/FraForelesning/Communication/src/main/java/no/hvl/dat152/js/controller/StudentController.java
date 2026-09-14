package no.hvl.dat152.js.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import no.hvl.dat152.js.model.Student;
import no.hvl.dat152.js.response.AddStudentResponse;
import no.hvl.dat152.js.response.ServerResponse;

@Controller
@RequestMapping(path = "/api")
public class StudentController {
    @PostMapping(path = "/student", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ServerResponse addStudent(@RequestBody Student student) {
        AddStudentResponse response = new AddStudentResponse();
        if (student != null) {
            response.setStudent(student);
            response.setResponseStatus(true);
        }
        return response;
    }
}
