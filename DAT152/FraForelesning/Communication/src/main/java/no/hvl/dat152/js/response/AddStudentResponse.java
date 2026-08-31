package no.hvl.dat152.js.response;

import no.hvl.dat152.js.model.Student;

public class AddStudentResponse extends ServerResponse {
    private Student student;

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

}
