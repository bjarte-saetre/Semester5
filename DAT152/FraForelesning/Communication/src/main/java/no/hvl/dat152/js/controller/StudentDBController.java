package no.hvl.dat152.js.controller;

import java.util.Optional;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.transaction.Transactional;
import no.hvl.dat152.js.model.Student;
import no.hvl.dat152.js.repository.StudentRepository;
import no.hvl.dat152.js.response.AddStudentResponse;
import no.hvl.dat152.js.response.DeleteStudentResponse;
import no.hvl.dat152.js.response.GetStudentlistResponse;
import no.hvl.dat152.js.response.ServerResponse;

@Controller
@RequestMapping(path = "/apidb")
public class StudentDBController {

    private final StudentRepository studentRepository;

    StudentDBController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @PostMapping(path = "/student", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ServerResponse addStudent(@RequestBody Student student) {
        AddStudentResponse response = new AddStudentResponse();
        if (student != null) {
            Student savedStudent = studentRepository.save(student);
            response.setStudent(savedStudent);
            response.setResponseStatus(true);
        }
        return response;
    }

    @Transactional
    @GetMapping(path = "/studentlist", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ServerResponse getTasks() {
        GetStudentlistResponse response = new GetStudentlistResponse();
        Iterable<Student> students = studentRepository.findAll();
        response.setStudents(students);
        response.setResponseStatus(true);

        return response;
    }

    @Transactional
    @DeleteMapping(path = "/student/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ServerResponse deleteTask(@PathVariable Integer id) {
        DeleteStudentResponse response = new DeleteStudentResponse();
        if (id != null) {
            if (id >= 1) {
                Optional<Student> studentOpt = studentRepository.findById(id);
                if (studentOpt.isPresent()) {
                    Student student = studentOpt.get();
                    studentRepository.delete(student);
                    response.setId(id);
                    response.setResponseStatus(true);
                }
            }
        }

        return response;
    }
}
